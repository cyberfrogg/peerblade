import { Express, Request, Response } from "express";
import IRoute from "../../../services/routes/IRoute";
import StartSequenceNode from "../../../services/sequencer/impl/actions/StartSequenceNode";
import DebugSequenceNode from "../../../services/sequencer/impl/actions/DebugSequenceNode";
import ReturnErrCodeSequenceNode from "../../../services/sequencer/impl/actions/ReturnErrCodeSequenceNode";
import SequenceNodeExecuteData from "../../../services/sequencer/SequenceNodeExecuteData";

class GetPingRoute implements IRoute {
    readonly path: string;

    constructor(path: string) {
        this.path = path;
    }

    initialize = async (expressApp: Express): Promise<void> => {

        let firstNode = new StartSequenceNode();
        firstNode
            .append(new DebugSequenceNode("1"))
            .append(new DebugSequenceNode("2"))
            .append(new DebugSequenceNode("3"))
            .append(new ReturnErrCodeSequenceNode("ERRCODE_NONE"))
            .append(new DebugSequenceNode("last"))

        expressApp.get(this.path, (req: Request, res: Response) => {
            firstNode.execute(SequenceNodeExecuteData.empty(req, res))
        });
    }
}

export default GetPingRoute;