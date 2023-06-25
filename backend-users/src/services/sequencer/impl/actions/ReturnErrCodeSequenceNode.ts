import SequenceNodeAction from "../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import ApiResponseData from "../../utils/ApiResponseData";

class ReturnErrCodeSequenceNode extends SequenceNodeAction {
    readonly errcode: string = "ERRCODE_UNKNOWN";
    readonly isExposeData: boolean = false;

    constructor(errcode: string, isExposeData: boolean) {
        super("action", "returnErrCode");
        this.errcode = errcode;
        this.isExposeData = isExposeData;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        data.response.json(ApiResponseData.Error(this.errcode, this.isExposeData ? data.data : undefined));
    }
}

export default ReturnErrCodeSequenceNode;