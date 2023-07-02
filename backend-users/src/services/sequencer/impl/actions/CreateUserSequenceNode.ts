import SequenceNode from "../../SequenceNode";
import SequenceNodeAction from "../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import DatabaseQuery from "../../../database/DatabaseQuery";
import UserRow from "../../../../data/user/UserRow";
import DatabaseTableKeys from "../../../../data/DatabaseTableKeys";

class CreateUserSequenceNode extends SequenceNodeAction {
    readonly databaseQuery: DatabaseQuery;
    readonly usernameRecord: string;
    readonly emailRecord: string;
    readonly passwordRecord: string;
    readonly outputCreateduserRecord: string;

    constructor(
        onErrorNode: SequenceNode,
        databaseQuery: DatabaseQuery,
        usernameRecord: string,
        emailRecord: string,
        passwordRecord: string,
        outputCreatedUserRecord: string
    ) {
        super("action", "createUser", onErrorNode);
        this.databaseQuery = databaseQuery;
        this.usernameRecord = usernameRecord;
        this.emailRecord = emailRecord;
        this.passwordRecord = passwordRecord;
        this.outputCreateduserRecord = outputCreatedUserRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        try {
            const username = data.data[this.usernameRecord];
            const email = data.data[this.emailRecord];
            const password = data.data[this.passwordRecord];

            const newUserUuid = await this.databaseQuery.build().getNextUuid();

            const createQueryResult = await this.databaseQuery
                .build()
                .insertInto(DatabaseTableKeys.Users, ["uuid", "username", "email", "password"])
                .values([newUserUuid, username, email, password])
                .execute();

            if (createQueryResult.affectedRows != 1) {
                throw new Error("Failed to check queryResult.affectedRows");
            }

            const getUserQueryResult = await this.databaseQuery
                .build()
                .selectAllFrom(DatabaseTableKeys.Users)
                .where("uuid = ?")
                .execute([newUserUuid]);

            if (getUserQueryResult.length == undefined || getUserQueryResult.length == 0 || getUserQueryResult[0] == undefined) {
                throw new Error("Failed to get created user getUserQueryResult");
            }

            data.data[this.outputCreateduserRecord] = new UserRow(
                getUserQueryResult[0].uuid,
                getUserQueryResult[0].username,
                getUserQueryResult[0].email,
                getUserQueryResult[0].password,
                new Date(getUserQueryResult[0].create_time)
            );

            await this.next(data);
        }
        catch (e) {
            await this.executeOnErrorNode("Failed to create user. Error message: " + e, data);
        }
    }
}

export default CreateUserSequenceNode;