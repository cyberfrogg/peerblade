import SequenceNodeValidator from "../../../SequenceNodeValidator";
import SequenceNodeExecuteData from "../../../SequenceNodeExecuteData";
import SequenceNode from "../../../SequenceNode";
import RangeVal from "../../../../utils/RangeVal";
import { REGEX_EMAIL_VALIDATION_TEST } from "../../../../utils/RegexPalletes"

class ValidateEmailSequenceNode extends SequenceNodeValidator {
    readonly emailRange: RangeVal = new RangeVal(3, 250);
    readonly emailRecord: string = "";

    constructor(
        onTrueNode: SequenceNode,
        onFalseNode: SequenceNode,
        emailRecord: string
    ) {
        super(onTrueNode, onFalseNode, "validateEmail", undefined);
        this.emailRecord = emailRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        try {
            const email = data.data[this.emailRecord];

            if (!this.isEmailValid(email)) {
                await this.executeOnFalseNode(data);
                return;
            }

            await this.executeOnTrueNode(data);
        }
        catch {
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

export default ValidateEmailSequenceNode;