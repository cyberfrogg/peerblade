import SequenceNodeValidator from "../../../SequenceNodeValidator";
import SequenceNode from "../../../SequenceNode";
import SequenceNodeExecuteData from "../../../SequenceNodeExecuteData";

type BooleanEquationPredicate<SequenceNodeExecuteData> = (data: SequenceNodeExecuteData) => boolean;

// Use this only for super-specific cases. Better to create node for it.
class BooleanEquationSequenceNode extends SequenceNodeValidator {
    private readonly condition: BooleanEquationPredicate<SequenceNodeExecuteData>;

    constructor(
        onTrueNode: SequenceNode,
        onFalseNode: SequenceNode,
        condition: BooleanEquationPredicate<SequenceNodeExecuteData>
    ) {
        super(onTrueNode, onFalseNode, "booleanEquation", undefined);
        this.condition = condition;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        const conditionResult = this.condition(data);

        if(conditionResult){
            await this.executeOnTrueNode(data);
        }
        else{
            await this.executeOnFalseNode(data);
        }
    }
}

export default BooleanEquationSequenceNode;