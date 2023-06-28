import SequenceNodeAction from "../../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../../SequenceNodeExecuteData";

class StartSequenceNode extends SequenceNodeAction {
    constructor() {
        super("action", "start", undefined);
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        await this.next(data);
    }
}

export default StartSequenceNode;