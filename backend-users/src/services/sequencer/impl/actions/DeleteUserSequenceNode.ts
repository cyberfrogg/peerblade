import SequenceNode from "../../SequenceNode";
import SequenceNodeAction from "../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import DatabaseQuery from "../../../database/DatabaseQuery";
import UserRow from "../../../../data/user/UserRow";
import DatabaseTableKeys from "../../../../data/DatabaseTableKeys";

class CreateUserSequenceNode extends SequenceNodeAction {
    readonly databaseQuery: DatabaseQuery;
    readonly userRecord: string;

    constructor(
        onErrorNode: SequenceNode,
        databaseQuery: DatabaseQuery,
        userRecord: string
    ) {
        super("action", "deleteUser", onErrorNode);
        this.databaseQuery = databaseQuery;
        this.userRecord = userRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        try {
            const user = data.data[this.userRecord] as UserRow;

            await this.databaseQuery
                .build()
                .deleteFrom(DatabaseTableKeys.EmailVerificationTokens)
                .where("useruuid = ?")
                .execute([user.uuid]);

            await this.databaseQuery
                .build()
                .deleteFrom(DatabaseTableKeys.Users)
                .where("uuid = ?")
                .execute([user.uuid]);

            await this.next(data);
        }
        catch (e) {
            await this.executeOnErrorNode("Failed to create user. Error message: " + e, data);
        }
    }
}

export default CreateUserSequenceNode;