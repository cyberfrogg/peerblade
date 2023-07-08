import SequenceNode from "../../SequenceNode";
import SequenceNodeAction from "../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import DatabaseQuery from "../../../database/DatabaseQuery";
import UserRow from "../../../../data/user/UserRow";
import DatabaseTableKeys from "../../../../data/DatabaseTableKeys";
import {GenerateRandomString, HashString} from "../../../utils/StringUtils";
import SessionRow from "../../../../data/session/SessionRow";

class CreateSessionSequenceNode extends SequenceNodeAction {
    readonly databaseQuery: DatabaseQuery;
    readonly userRecord: string;
    readonly outputSessionRecord: string;

    constructor(
        onErrorNode: SequenceNode,
        databaseQuery: DatabaseQuery,
        userRecord: string,
        outputSessionRecord: string
    ) {
        super("action", "createSession", onErrorNode);
        this.databaseQuery = databaseQuery;
        this.userRecord = userRecord;
        this.outputSessionRecord = outputSessionRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        try {
            const user = data.data[this.userRecord] as UserRow;

            const newSessionUuid = await this.databaseQuery.build().getNextUuid();

            const newSessionToken = HashString(newSessionUuid + GenerateRandomString(200));

            const createSessionQueryResult = await this.databaseQuery.build()
                .insertInto(DatabaseTableKeys.Sessions, ["uuid, useruuid", "token"])
                .values([newSessionUuid, user.username, newSessionToken])
                .execute();

            if (createSessionQueryResult.affectedRows != 1) {
                throw new Error("Failed to check createSessionQueryResult.affectedRows");
            }

            // get created session
            const getSessionQueryResult = await this.databaseQuery
                .build()
                .selectAllFrom(DatabaseTableKeys.Sessions)
                .where("uuid = ?")
                .execute([newSessionUuid]);

            if (getSessionQueryResult.length == undefined || getSessionQueryResult.length == 0 || getSessionQueryResult[0] == undefined) {
                throw new Error("Failed to get created session getSessionQueryResult");
            }

            data.data[this.outputSessionRecord] = new SessionRow(
                getSessionQueryResult[0].uuid,
                getSessionQueryResult[0].useruuid,
                getSessionQueryResult[0].token,
                new Date(getSessionQueryResult[0].create_time)
            );

            await this.next(data);
        }
        catch (e) {
            await this.executeOnErrorNode("Failed to create user. Error message: " + e, data);
        }
    }
}

export default CreateSessionSequenceNode;