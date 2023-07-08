import SequenceNodeValidator from "../../../SequenceNodeValidator";
import SequenceNodeExecuteData from "../../../SequenceNodeExecuteData";
import SequenceNode from "../../../SequenceNode";
import RangeVal from "../../../../utils/RangeVal";

class ValidateVerificationTokenSequenceNode extends SequenceNodeValidator {
    readonly tokenRange: RangeVal = new RangeVal(5, 1000);
    readonly verificationToken: string = "";

    constructor(
        onTrueNode: SequenceNode,
        onFalseNode: SequenceNode,
        tokenRecord: string
    ) {
        super(onTrueNode, onFalseNode, "validateVerificationToken", undefined);
        this.verificationToken = tokenRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        try {
            const token = data.data[this.verificationToken];

            if (token == undefined || !this.tokenRange.IsStringInRange(token) || token == "") {
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

export default ValidateVerificationTokenSequenceNode;