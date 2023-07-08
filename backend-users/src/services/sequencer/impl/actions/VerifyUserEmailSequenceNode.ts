import SequenceNode from "../../SequenceNode";
import SequenceNodeAction from "../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import DatabaseQuery from "../../../database/DatabaseQuery";
import DatabaseTableKeys from "../../../../data/DatabaseTableKeys";
import EmailVerificationTokenRow from "../../../../data/user/EmailVerificationTokenRow";

class VerifyUserEmailSequenceNode extends SequenceNodeAction {
    private readonly verificationTokenRecord: string;
    private readonly databaseQuery: DatabaseQuery;

    constructor(
        onErrorNode: SequenceNode,
        databaseQuery: DatabaseQuery,
        verificationTokenRecord: string
    ) {
        super("action", "verifyUserEmail", onErrorNode);
        this.databaseQuery = databaseQuery;
        this.verificationTokenRecord = verificationTokenRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        try {
            // input user token
            const token = data.data[this.verificationTokenRecord] as string;

            const tokenGetQueryResult = await this.databaseQuery.build()
                .selectAllFrom(DatabaseTableKeys.EmailVerificationTokens)
                .where("token = ?")
                .limit(1)
                .execute([token])

            if(tokenGetQueryResult == undefined || tokenGetQueryResult.length == undefined || tokenGetQueryResult.length == 0 || tokenGetQueryResult[0] == undefined){
                throw new Error("Token not found");
            }

            // check if user email token already verified
            const tokenRow = tokenGetQueryResult[0] as EmailVerificationTokenRow;
            if(tokenRow.isVerified){
                throw new Error(tokenRow.useruuid + " Already verificated");
            }

            // the row token
            const collectedToken = tokenRow.token;

            if(collectedToken != token){
                throw new Error("Token assertion failed");
            }

            const tokenUpdateQueryResult = await this.databaseQuery.build()
                .update(DatabaseTableKeys.EmailVerificationTokens)
                .column("token")
                .column("isverified")
                .where("token = ?")
                .execute(["", 1, token]);

            if(tokenUpdateQueryResult == undefined){
                throw new Error("Token not updated");
            }

            await this.next(data);
        }
        catch (e) {
            await this.executeOnErrorNode("Failed to verify user email. Error message: " + e, data);
        }
    }
}

export default VerifyUserEmailSequenceNode;