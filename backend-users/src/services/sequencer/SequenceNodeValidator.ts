import SequenceNode from "./SequenceNode";
import SequenceNodeExecuteData from "./SequenceNodeExecuteData";

class SequenceNodeValidator extends SequenceNode {
    readonly onTrueNode: SequenceNode;
    readonly onFalseNode: SequenceNode;

    constructor(onTrueNode: SequenceNode, onFalseNode: SequenceNode, type: string, name: string) {
        super("validator", "validateUserCreateInput");
        this.onTrueNode = onTrueNode;
        this.onFalseNode = onFalseNode;
    }

    executeOnTrueNode = async (data: SequenceNodeExecuteData): Promise<void> => {
        await this.onTrueNode.execute(data);
    }
    executeOnFalseNode = async (data: SequenceNodeExecuteData): Promise<void> => {
        await this.onFalseNode.execute(data);
    }
}

export default SequenceNodeValidator;