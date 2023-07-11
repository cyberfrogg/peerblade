import SequenceNodeAction from "../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../SequenceNodeExecuteData";
import SaltValuePair from "../../../utils/SaltValuePair";
import UserRow from "../../../../data/user/UserRow";

class ExtractPasswordSaltValueFromUserSequenceNode extends SequenceNodeAction {
    private readonly userRecord: string;
    private readonly saltValueOutputRecord: string;

    constructor(userRecord: string, saltValueOutputRecord: string) {
        super("action", "extractPasswordSaltValueFromUser", undefined);
        this.userRecord = userRecord;
        this.saltValueOutputRecord = saltValueOutputRecord;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        let user = data.data[this.userRecord] as UserRow;

        data.data[this.saltValueOutputRecord] = SaltValuePair.FromRaw(user.password);

        await this.next(data);
    }
}

export default ExtractPasswordSaltValueFromUserSequenceNode;