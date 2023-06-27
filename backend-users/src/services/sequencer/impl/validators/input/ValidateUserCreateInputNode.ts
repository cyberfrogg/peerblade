import SequenceNodeValidator from "../../../SequenceNodeValidator";
import SequenceNodeExecuteData from "../../../SequenceNodeExecuteData";
import SequenceNode from "../../../SequenceNode";
import RangeVal from "../../../../utils/RangeVal";
import { REGEX_EMAIL_VALIDATION_TEST } from "../../../../utils/RegexPalletes"

class ValidateUserCreateInputNode extends SequenceNodeValidator {
    readonly usernameRange: RangeVal = new RangeVal(4, 30);
    readonly emailRange: RangeVal = new RangeVal(3, 250);
    readonly passwordRange: RangeVal = new RangeVal(8, 50);

    constructor(onTrueNode: SequenceNode, onFalseNode: SequenceNode) {
        super(onTrueNode, onFalseNode, "validator", "validateUserCreateInput");
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        try {
            const username = data.request.body.username;
            const email = data.request.body.email;
            const password = data.request.body.password;

            if (username == undefined || !this.usernameRange.IsStringInRange(username)) {
                data.data.failedValidationField = "username";
                data.data.isFieldValidationFailed = true;
            }
            if (!this.isEmailValid(email)) {
                data.data.failedValidationField = "email";
                data.data.isFieldValidationFailed = true;
            }
            if (password == undefined || !this.passwordRange.IsStringInRange(password)) {
                data.data.failedValidationField = "passoword";
                data.data.isFieldValidationFailed = true;
            }

            if (!data.data.isFieldValidationFailed) {
                await this.executeOnTrueNode(data);
            } else {
                await this.executeOnFalseNode(data);
            }
        }
        catch {
            data.data.fieldValidation = { isError: true };
            await this.executeOnFalseNode(data);
        }
    }

    isEmailValid = (value: string): boolean => {
        try {
            if (value == undefined) {
                return false;
            }

            const emailString: string = value as string;

            if (!this.emailRange.IsStringInRange(emailString)) {
                return false;
            }

            if (!REGEX_EMAIL_VALIDATION_TEST.test(emailString.toLowerCase())) {
                return false;
            }

            return true;
        }
        catch {
            return false
        }
    }
}

export default ValidateUserCreateInputNode;