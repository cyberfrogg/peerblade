import SequenceNodeAction from "../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import ApiResponseData from "../../utils/ApiResponseData";

class ReturnSuccessWithPreviousNodeDataNode extends SequenceNodeAction {

    constructor() {
        super("action", "returnSuccessWithPreviousNodeData");
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        data.response.json(ApiResponseData.Success(data.data));

        await this.next(data);
    }
}

export default ReturnSuccessWithPreviousNodeDataNode;