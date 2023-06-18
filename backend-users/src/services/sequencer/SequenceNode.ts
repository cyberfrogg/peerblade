import SequenceNodeExecuteData from "./SequenceNodeExecuteData";

class SequenceNode {
    readonly type: string = "";
    readonly name: string = "";

    nextNodeNode: SequenceNode | undefined = undefined;

    constructor(type: string, name: string) {
        this.type = type;
        this.name = name;
    }

    append = (node: SequenceNode): SequenceNode => {
        this.nextNodeNode = node;
        return node;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        console.error("SequenceNode " + this.name + " not implemented");
    }

    next = async (data: SequenceNodeExecuteData): Promise<void> => {
        if (this.nextNodeNode == undefined)
            return;

        await this.nextNodeNode.execute(data);
    }
}

export default SequenceNode;