import SequenceNodeAction from "../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import SaltValuePair from "../../../utils/SaltValuePair";

class HashWithSaltPasswordSequenceNode extends SequenceNodeAction {
    private readonly passwordRecord: string;

    constructor(passwordRecord: string) {
        super("action", "hashPassword", undefined);
        this.passwordRecord = passwordRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        let password = data.data[this.passwordRecord] as string;
        let saltValuePair = SaltValuePair.CreateSaltAndHashValue(password);
        password = saltValuePair.ToRaw();
        data.data[this.passwordRecord] = password;

        await this.next(data);
    }
}

export default HashWithSaltPasswordSequenceNode;