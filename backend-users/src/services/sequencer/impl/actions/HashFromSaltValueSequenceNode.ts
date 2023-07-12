import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import SequenceNode from "../../SequenceNode";
import SaltValuePair from "../../../utils/SaltValuePair";

class HashFromSaltValueSequenceNode extends SequenceNode {
    private readonly saltValueRecord: string;
    private readonly valueRecord: string;
    private readonly outputSaltValueRecord: string;

    constructor(
        valueRecord: string,
        saltValueRecord: string,
        outputSaltValueRecord: string
    ) {
        super("action", "hashFromSaltValue", undefined);

        this.valueRecord = valueRecord;
        this.saltValueRecord = saltValueRecord;
        this.outputSaltValueRecord = outputSaltValueRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        let value = data.data[this.valueRecord];

        let saltValue = data.data[this.saltValueRecord] as SaltValuePair;

        data.data[this.outputSaltValueRecord] = SaltValuePair.CreateFromSalt(saltValue.Salt, value);

        await this.next(data);
    }
}

export default HashFromSaltValueSequenceNode;