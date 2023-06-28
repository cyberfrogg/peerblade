import SequenceNodeValidator from "../../../SequenceNodeValidator";
import SequenceNodeExecuteData from "../../../SequenceNodeExecuteData";
import SequenceNode from "../../../SequenceNode";
import RangeVal from "../../../../utils/RangeVal";

class ValidatePasswordSequenceNode extends SequenceNodeValidator {
    readonly passwordRange: RangeVal = new RangeVal(8, 50);
    readonly passwordRecord: string = "";

    constructor(
        onTrueNode: SequenceNode,
        onFalseNode: SequenceNode,
        passwordRecord: string
    ) {
        super(onTrueNode, onFalseNode, "validatePassword", undefined);
        this.passwordRecord = passwordRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        try {
            const password = data.data[this.passwordRecord];

            if (password == undefined || !this.passwordRange.IsStringInRange(password)) {
                await this.executeOnFalseNode(data);
                return;
            }

            await this.executeOnTrueNode(data);
        }
        catch {
            await this.executeOnFalseNode(data);
        }
    }
}

export default ValidatePasswordSequenceNode;