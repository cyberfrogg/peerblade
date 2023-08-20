import SequenceNodeAction from "../../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../../SequenceNodeExecuteData";
import ApiResponseData from "../../../utils/ApiResponseData";

class ReturnSuccessWithDataNode extends SequenceNodeAction {
    readonly keysToOutput: string[];

    constructor(keysToOutput: string[]) {
        super("action", "returnSuccessWithData", undefined);
        this.keysToOutput = keysToOutput
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        let dataToOutput: Record<string, any> = {};

        for (const key in data.data) {
            if (this.keysToOutput.includes(key)) {
                dataToOutput[key] = data.data[key];
            }
        }

        data.response.json(ApiResponseData.Success(dataToOutput));
    }
}

export default ReturnSuccessWithDataNode;