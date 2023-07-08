import SequenceNode from "../../SequenceNode";
import SequenceNodeAction from "../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import DatabaseQuery from "../../../database/DatabaseQuery";
import UserRow from "../../../../data/user/UserRow";
import {GenerateRandomString, HashString} from "../../../utils/StringUtils";
import EmailVerificationTokenRow from "../../../../data/user/EmailVerificationTokenRow";
import DatabaseTableKeys from "../../../../data/DatabaseTableKeys";

class CreateUserEmailVerificationTokenSequenceNode extends SequenceNodeAction {
    readonly databaseQuery: DatabaseQuery;
    readonly userRecord: string;
    readonly outputVerificationTokenRecord: string;

    constructor(
        onErrorNode: SequenceNode,
        databaseQuery: DatabaseQuery,
        userRecord: string,
        outputVerificationTokenRecord: string
    ) {
        super("action", "createUserEmailVerificationToken", onErrorNode);
        this.databaseQuery = databaseQuery;
        this.userRecord = userRecord;
        this.outputVerificationTokenRecord = outputVerificationTokenRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        try {
            const user = data.data[this.userRecord] as UserRow;

            const newTokenUuid = await this.databaseQuery.build().getNextUuid();
            const token = HashString(newTokenUuid + GenerateRandomString(200));

            const createQueryResult = await this.databaseQuery.build()
                .insertInto(DatabaseTableKeys.EmailVerificationTokens, ["uuid", "useruuid", "token", "isverified"])
                .values([newTokenUuid, user.uuid, token, 0])
                .execute();//

            if (createQueryResult.affectedRows != 1) {
                throw new Error("Failed to check queryResult.affectedRows");
            }

            const getTokenQueryResult = await this.databaseQuery
                .build()
                .selectAllFrom(DatabaseTableKeys.EmailVerificationTokens)
                .where("uuid = ?")
                .execute([newTokenUuid]);

            if (getTokenQueryResult.length == undefined || getTokenQueryResult.length == 0 || getTokenQueryResult[0] == undefined) {
                throw new Error("Failed to get created token getTokenQueryResult");
            }

            data.data[this.outputVerificationTokenRecord] = new EmailVerificationTokenRow(
                getTokenQueryResult[0].uuid,
                getTokenQueryResult[0].useruuid,
                getTokenQueryResult[0].token,
                Number.parseInt(getTokenQueryResult[0].isVerified),
                new Date(getTokenQueryResult[0].create_time)
            );

            await this.next(data);
        }
        catch (e) {
            await this.executeOnErrorNode("Failed to create user email verification token. Error message: " + e, data);
        }
    }
}

export default CreateUserEmailVerificationTokenSequenceNode;