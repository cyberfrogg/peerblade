import { Express, Request, Response } from "express";
import IRoute from "../../../../services/routes/IRoute";
import StartSequenceNode from "../../../../services/sequencer/impl/actions/StartSequenceNode";
import SequenceNodeExecuteData from "../../../../services/sequencer/SequenceNodeExecuteData";
import ReturnSuccessWithPreviousNodeDataNode from "../../../../services/sequencer/impl/actions/ReturnSuccessWithPreviousNodeDataNode";
import ValidateUserCreateInputNode from "../../../../services/sequencer/impl/validators/ValidateUserCreateInputNode";
import ReturnErrCodeSequenceNode from "../../../../services/sequencer/impl/actions/ReturnErrCodeSequenceNode";

class PostUserCreateRoute implements IRoute {
    readonly path: string;

    constructor(path: string) {
        this.path = path;
    }

    initialize = async (expressApp: Express): Promise<void> => {

        let firstNode = new StartSequenceNode();
        firstNode
            .append(
                new ValidateUserCreateInputNode(
                    new ReturnSuccessWithPreviousNodeDataNode(),
                    new ReturnErrCodeSequenceNode("ERRCODE_VALIDATION_FAIL", true)
                )
            );

        expressApp.post(this.path, (req: Request, res: Response) => {
            firstNode.execute(new SequenceNodeExecuteData("userCreateResponse", req, res, {}))
        });
    }
}

export default PostUserCreateRoute;