import SequenceNode from "../../SequenceNode";
import SequenceNodeAction from "../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import DatabaseQuery from "../../../database/DatabaseQuery";
import DatabaseTableKeys from "../../../../data/DatabaseTableKeys";
import UserRow from "../../../../data/user/UserRow";

class GetUserByEmailSequenceNode extends SequenceNodeAction {
    private readonly databaseQuery: DatabaseQuery;
    private readonly emailRecord: string;
    private readonly userOutputRecord: string;

    constructor(
        onErrorNode: SequenceNode,
        databaseQuery: DatabaseQuery,
        emailRecord: string,
        userOutputRecord: string
    ) {
        super("action", "getUserByEmail", onErrorNode);
        this.databaseQuery = databaseQuery;
        this.emailRecord = emailRecord;
        this.userOutputRecord = userOutputRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        try {
            const email = data.data[this.emailRecord] as string;

            if(email == ""){
                throw new Error("User not found");
            }

            const userGetQueryResult = await this.databaseQuery.build()
                .selectAllFrom(DatabaseTableKeys.Users)
                .where("email = ?")
                .limit(1)
                .execute([email]);

            if(userGetQueryResult == undefined || userGetQueryResult.length == undefined || userGetQueryResult.length == 0 || userGetQueryResult[0] == undefined){
                throw new Error("User not found");
            }

            data.data[this.userOutputRecord] =  userGetQueryResult[0] as UserRow;

            await this.next(data);
        }
        catch (e) {
            await this.executeOnErrorNode("Failed to get user by email. Error message: " + e, data);
        }
    }
}

export default GetUserByEmailSequenceNode;