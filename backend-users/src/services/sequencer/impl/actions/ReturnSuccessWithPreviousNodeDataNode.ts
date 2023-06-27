import SequenceNodeAction from "../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import ApiResponseData from "../../utils/ApiResponseData";

class ReturnSuccessWithPreviousNodeDataNode extends SequenceNodeAction {
    readonly keysToOutput: string[];

    constructor(keysToOutput: string[]) {
        super("action", "returnSuccessWithPreviousNodeData");
        this.keysToOutput = keysToOutput
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        let dataToOutput: Record<string, any> = {};

        for (const key in data.data) {
            if (this.keysToOutput.includes(key)) {
                dataToOutput[key] = data.data[key];
                console.log(key);
            }
        }

        data.response.json(ApiResponseData.Success(dataToOutput));

        await this.next(data);
    }
}

export default ReturnSuccessWithPreviousNodeDataNode;