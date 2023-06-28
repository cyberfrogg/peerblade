import SequenceNodeExecuteData from "./SequenceNodeExecuteData";

class SequenceNode {
    readonly type: string = "";
    readonly name: string = "";
    readonly onErrorNode: SequenceNode | undefined = undefined;

    nextNodeNode: SequenceNode | undefined = undefined;

    constructor(type: string, name: string, onErrorNode: SequenceNode | undefined) {
        this.type = type;
        this.name = name;
        this.onErrorNode = onErrorNode;
    }

    append = (node: SequenceNode): SequenceNode => {
        this.nextNodeNode = node;
        return node;
    }

    execute = async (data: SequenceNodeExecuteData): Promise<void> => {
        console.error("SequenceNode " + this.name + " not implemented");
    }

    executeOnErrorNode = async (data: SequenceNodeExecuteData): Promise<void> => {
        if (this.onErrorNode != undefined) {
            await this.onErrorNode.execute(data);
            return;
        }

        console.error("No Error Node was defined in " + this.name + " node");
    }

    next = async (data: SequenceNodeExecuteData): Promise<void> => {
        if (this.nextNodeNode == undefined) {
            console.error("No Next Node was defined in " + this.name + " node");
            return;
        }

        await this.nextNodeNode.execute(data);
    }
}

export default SequenceNode;