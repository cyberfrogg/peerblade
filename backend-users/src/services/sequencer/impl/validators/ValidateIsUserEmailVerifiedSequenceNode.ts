import SequenceNodeValidator from "../../SequenceNodeValidator";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import SequenceNode from "../../SequenceNode";
import DatabaseQuery from "../../../database/DatabaseQuery";
import DatabaseTableKeys from "../../../../data/DatabaseTableKeys";
import EmailVerificationTokenRow from "../../../../data/user/EmailVerificationTokenRow";

class ValidateIsUserEmailVerifiedSequenceNode extends SequenceNodeValidator {
    readonly databaseQuery: DatabaseQuery;

    readonly userRecord: string;
    readonly discoveredEmailVerificationTokenRecord: string;

    constructor(
        onTrueNode: SequenceNode,
        onFalseNode: SequenceNode,
        onErrorNode: SequenceNode | undefined,
        databaseQuery: DatabaseQuery,
        userRecord: string,
        discoveredEmailVerificationTokenRecord: string
    ) {
        super(onTrueNode, onFalseNode, "validateIsUserEmailVerified", onErrorNode);
        this.databaseQuery = databaseQuery;

        this.userRecord = userRecord;
        this.discoveredEmailVerificationTokenRecord = discoveredEmailVerificationTokenRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        try {
            const queryResult = await this.databaseQuery
                .build()
                .selectAllFrom(DatabaseTableKeys.EmailVerificationTokens)
                .where("useruuid = ?")
                .execute([data.data[this.userRecord].uuid]);

            if (queryResult == undefined || queryResult.length == 0 || queryResult[0] == undefined) {
                await this.executeOnFalseNode(data);
                return;
            }

            const row = queryResult[0] as EmailVerificationTokenRow;
            data.data[this.discoveredEmailVerificationTokenRecord] = row;

            if(row.isverified == 1){
                await this.executeOnTrueNode(data);
                return;
            }

            await this.executeOnFalseNode(data);
        }
        catch (e) {
            await this.executeOnErrorNode("Failed to query database. Error message: " + e, data);
        }
    }
}

export default ValidateIsUserEmailVerifiedSequenceNode;