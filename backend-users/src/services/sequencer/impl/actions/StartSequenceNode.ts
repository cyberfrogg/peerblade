import SequenceNodeAction from "../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";

class StartSequenceNode extends SequenceNodeAction {
    constructor() {
        super("action", "start");
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        console.log("StartSequenceNode execute");
        await this.next(data);
    }
}

export default StartSequenceNode;