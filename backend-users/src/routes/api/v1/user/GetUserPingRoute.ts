import { Express, Request, Response } from "express";
import IRoute from "../../../../services/routes/IRoute";
import StartSequenceNode from "../../../../services/sequencer/impl/actions/utils/StartSequenceNode";
import SequenceNodeExecuteData from "../../../../services/sequencer/SequenceNodeExecuteData";
import ReturnSuccessWithDataNode from "../../../../services/sequencer/impl/actions/utils/ReturnSuccessWithDataNode";

class GetUserPingRoute implements IRoute {
    readonly path: string;

    constructor(path: string) {
        this.path = path;
    }

    initialize = async (expressApp: Express): Promise<void> => {

        let firstNode = new StartSequenceNode();
        firstNode
            .append(new ReturnSuccessWithDataNode([]))

        expressApp.get(this.path, (req: Request, res: Response) => {
            firstNode.execute(SequenceNodeExecuteData.empty(req, res))
        });
    }
}

export default GetUserPingRoute;