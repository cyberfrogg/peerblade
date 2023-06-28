import SequenceNodeAction from "../../../SequenceNodeAction";
import SequenceNodeExecuteData from "../../../SequenceNodeExecuteData";

class PopulateRequestInputFieldsInRecordsSequenceNode extends SequenceNodeAction {
    populateFields: string[];

    constructor(populateFields: string[]) {
        super("action", "populateRequestInputFieldsInRecordsSequenceNode", undefined);
        this.populateFields = populateFields;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        for (let i = 0; i < this.populateFields.length; i++) {
            const field = this.populateFields[i];
            data.data[field] = data.request.body[field];
        }

        await this.next(data);
    }
}

export default PopulateRequestInputFieldsInRecordsSequenceNode;