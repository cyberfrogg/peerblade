import SequenceNodeAction from "../../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../../SequenceNodeExecuteData";
import ApiResponseData from "../../../utils/ApiResponseData";

class ReturnErrCodeSequenceNode extends SequenceNodeAction {
    readonly errcode: string = "ERRCODE_UNKNOWN";
    readonly keysToOutput: string[];

    constructor(errcode: string, keysToOutput: string[]) {
        super("action", "returnErrCode", undefined);
        this.errcode = errcode;
        this.keysToOutput = keysToOutput
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        let dataToOutput: Record<string, any> = {};

        for (const key in data.data) {
            if (this.keysToOutput.includes(key)) {
                dataToOutput[key] = data.data[key];
            }
        }

        data.response.json(ApiResponseData.Error(this.errcode, dataToOutput));

        await this.next(data);
    }
}

export default ReturnErrCodeSequenceNode;