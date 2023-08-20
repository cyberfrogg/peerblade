import SequenceNode from "../../SequenceNode";
import SequenceNodeAction from "../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import DatabaseQuery from "../../../database/DatabaseQuery";
import DatabaseTableKeys from "../../../../data/DatabaseTableKeys";
import UserRow from "../../../../data/user/UserRow";

class GetUserByUsernameSequenceNode extends SequenceNodeAction {
    private readonly databaseQuery: DatabaseQuery;
    private readonly usernameRecord: string;
    private readonly userOutputRecord: string;

    constructor(
        onErrorNode: SequenceNode,
        databaseQuery: DatabaseQuery,
        usernameRecord: string,
        userOutputRecord: string
    ) {
        super("action", "getUserByUsername", onErrorNode);
        this.databaseQuery = databaseQuery;
        this.usernameRecord = usernameRecord;
        this.userOutputRecord = userOutputRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        try {
            const username = data.data[this.usernameRecord] as string;

            if(username == ""){
                throw new Error("User not found");
            }

            const userGetQueryResult = await this.databaseQuery.build()
                .selectAllFrom(DatabaseTableKeys.Users)
                .where("username = ?")
                .limit(1)
                .execute([username]);

            if(userGetQueryResult == undefined || userGetQueryResult.length == undefined || userGetQueryResult.length == 0 || userGetQueryResult[0] == undefined){
                throw new Error("User not found");
            }

            data.data[this.userOutputRecord] =  userGetQueryResult[0] as UserRow;

            await this.next(data);
        }
        catch (e) {
            await this.executeOnErrorNode("Failed to get user by username. Error message: " + e, data);
        }
    }
}

export default GetUserByUsernameSequenceNode;