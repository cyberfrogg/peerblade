import SequenceNodeValidator from "../../SequenceNodeValidator";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import SequenceNode from "../../SequenceNode";
import DatabaseQuery from "../../../database/DatabaseQuery";

class ValidateUserExistsSequenceNode extends SequenceNodeValidator {
    readonly databaseQuery: DatabaseQuery;

    readonly discoveredUserRecord: string;
    readonly usernameToCheck: string;
    readonly emailToCheck: string;

    constructor(
        onTrueNode: SequenceNode,
        onFalseNode: SequenceNode,
        onErrorNode: SequenceNode | undefined,
        databaseQuery: DatabaseQuery,
        discoveredUserRecord: string,
        usernameToCheck: string,
        emailToCheck: string,
    ) {
        super(onTrueNode, onFalseNode, "validator", "validateUserExists", onErrorNode);
        this.databaseQuery = databaseQuery;

        this.discoveredUserRecord = discoveredUserRecord;
        this.usernameToCheck = usernameToCheck;
        this.emailToCheck = emailToCheck;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        try {

            const queryResult = await this.databaseQuery
                .selectAllFrom("users")
                .where("username = ? OR email = ?")
                .execute([data.data[this.usernameToCheck, this.emailToCheck]]);

            if (queryResult.length == 0) {
                await this.executeOnFalseNode(data);
            }

            data.data[this.discoveredUserRecord] = queryResult[0];

            await this.executeOnTrueNode(data);
        }
        catch (e) {

        }
    }
}

export default ValidateUserExistsSequenceNode;