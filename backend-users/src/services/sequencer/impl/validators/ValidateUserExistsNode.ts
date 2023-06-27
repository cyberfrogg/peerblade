import SequenceNodeValidator from "../../SequenceNodeValidator";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import SequenceNode from "../../SequenceNode";

class ValidateUserExistsNode extends SequenceNodeValidator {
    constructor(onTrueNode: SequenceNode, onFalseNode: SequenceNode) {
        super(onTrueNode, onFalseNode, "validator", "validateUserExists");
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        let isUserExists = true;

        if (isUserExists) {
            await this.executeOnTrueNode(data);
        } else {
            await this.executeOnFalseNode(data);
        }
    }
}

export default ValidateUserExistsNode;