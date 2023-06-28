import SequenceNodeValidator from "../../../SequenceNodeValidator";
import SequenceNodeExecuteData from "../../../SequenceNodeExecuteData";
import SequenceNode from "../../../SequenceNode";
import RangeVal from "../../../../utils/RangeVal";

class ValidateUsernameSequenceNode extends SequenceNodeValidator {
    readonly usernameRange: RangeVal = new RangeVal(4, 30);
    readonly usernameRecord: string = "";

    constructor(
        onTrueNode: SequenceNode,
        onFalseNode: SequenceNode,
        usernameRecord: string
    ) {
        super(onTrueNode, onFalseNode, "validator", "validateUsername", undefined);
        this.usernameRecord = usernameRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        try {
            const username = data.data[this.usernameRecord];

            if (username == undefined || !this.usernameRange.IsStringInRange(username)) {
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

export default ValidateUsernameSequenceNode;