import SequenceNodeAction from "../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import ApiResponseData from "../../utils/ApiResponseData";

class ReturnErrCodeSequenceNode extends SequenceNodeAction {
    errcode: string = "ERRCODE_UNKNOWN";

    constructor(errcode: string) {
        super("action", "returnErrCode");
        this.errcode = errcode;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        data.response.json(ApiResponseData.Error(this.errcode));

        await this.next(data);
    }
}

export default ReturnErrCodeSequenceNode;