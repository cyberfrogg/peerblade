import SequenceNodeAction from "../../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../../SequenceNodeExecuteData";

class DebugSequenceNode extends SequenceNodeAction {
    message: string = "message";

    constructor(message: string) {
        super("action", "debug", undefined);
        this.message = message;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        console.log(this.message);
        await this.next(data);
    }
}

export default DebugSequenceNode;