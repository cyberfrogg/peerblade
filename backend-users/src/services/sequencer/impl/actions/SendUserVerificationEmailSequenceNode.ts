import SequenceNode from "../../SequenceNode";
import SequenceNodeAction from "../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import UserRow from "../../../../data/user/UserRow";
import sendEmail from "../../../email/sendEmail";
import {getUserVerificationEmailContent} from "../../../email/emailTemplates";
import EmailVerificationTokenRow from "../../../../data/user/EmailVerificationTokenRow";

class SendUserVerificationEmailSequenceNode extends SequenceNodeAction {
    readonly userRecord: string;
    readonly userVerificationTokenRecord: string;

    constructor(
        onErrorNode: SequenceNode,
        userRecord: string,
        userVerificationTokenRecord: string
    ) {
        super("action", "sendUserVerificationEmail", onErrorNode);
        this.userRecord = userRecord;
        this.userVerificationTokenRecord = userVerificationTokenRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        try {
            const user = data.data[this.userRecord] as UserRow;
            const tokenRow = data.data[this.userVerificationTokenRecord] as EmailVerificationTokenRow;
            const emailContent = getUserVerificationEmailContent(user.username, tokenRow.token);

            await sendEmail("Verify your account", emailContent, user.email)

            await this.next(data);
        }
        catch (e) {
            await this.executeOnErrorNode("Failed to send verification email user. Error message: " + e, data);
        }
    }
}

export default SendUserVerificationEmailSequenceNode;