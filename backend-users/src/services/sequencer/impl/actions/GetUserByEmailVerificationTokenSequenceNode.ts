import SequenceNode from "../../SequenceNode";
import SequenceNodeAction from "../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import DatabaseQuery from "../../../database/DatabaseQuery";
import DatabaseTableKeys from "../../../../data/DatabaseTableKeys";
import EmailVerificationTokenRow from "../../../../data/user/EmailVerificationTokenRow";
import UserRow from "../../../../data/user/UserRow";

class GetUserByEmailVerificationTokenSequenceNode extends SequenceNodeAction {
    private readonly databaseQuery: DatabaseQuery;
    private readonly verificationTokenRecord: string;
    private readonly userOutputRecord: string;

    constructor(
        onErrorNode: SequenceNode,
        databaseQuery: DatabaseQuery,
        verificationTokenRecord: string,
        userOutputRecord: string
    ) {
        super("action", "getUserByVerificationToken", onErrorNode);
        this.databaseQuery = databaseQuery;
        this.verificationTokenRecord = verificationTokenRecord;
        this.userOutputRecord = userOutputRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        try {
            const token = data.data[this.verificationTokenRecord] as string;

            const tokenGetQueryResult = await this.databaseQuery.build()
                .selectAllFrom(DatabaseTableKeys.EmailVerificationTokens)
                .where("token = ?")
                .limit(1)
                .execute([token]);

            if(tokenGetQueryResult == undefined || tokenGetQueryResult.length == undefined || tokenGetQueryResult.length == 0 || tokenGetQueryResult[0] == undefined){
                throw new Error("Token not found");
            }

            // check if user email token already verified
            const tokenRow = tokenGetQueryResult[0] as EmailVerificationTokenRow;

            const userGetQueryResult = await this.databaseQuery.build()
                .selectAllFrom(DatabaseTableKeys.Users)
                .where("uuid = ?")
                .limit(1)
                .execute([tokenRow.useruuid]);

            if(userGetQueryResult == undefined || userGetQueryResult.length == undefined || userGetQueryResult.length == 0 || userGetQueryResult[0] == undefined){
                throw new Error("User not found");
            }

            data.data[this.userOutputRecord] = userGetQueryResult[0] as UserRow;

            await this.next(data);
        }
        catch (e) {
            await this.executeOnErrorNode("Failed to get user by verification token. Error message: " + e, data);
        }
    }
}

export default GetUserByEmailVerificationTokenSequenceNode;