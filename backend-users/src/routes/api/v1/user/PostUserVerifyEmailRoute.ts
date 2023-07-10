import {Express, Request, Response} from "express";
import IRoute from "../../../../services/routes/IRoute";
import StartSequenceNode from "../../../../services/sequencer/impl/actions/utils/StartSequenceNode";
import SequenceNodeExecuteData from "../../../../services/sequencer/SequenceNodeExecuteData";
import ReturnErrCodeSequenceNode from "../../../../services/sequencer/impl/actions/utils/ReturnErrCodeSequenceNode";
import DatabaseQuery from "../../../../services/database/DatabaseQuery";
import PopulateRequestInputFieldsInRecordsSequenceNode from "../../../../services/sequencer/impl/actions/utils/PopulateRequestInputFieldsInRecordsSequenceNode";
import ValidateVerificationTokenSequenceNode
    from "../../../../services/sequencer/impl/validators/input/ValidateVerificationTokenNode";
import VerifyUserEmailSequenceNode from "../../../../services/sequencer/impl/actions/VerifyUserEmailSequenceNode";
import SequenceNode from "../../../../services/sequencer/SequenceNode";
import ReturnSuccessWithDataNode from "../../../../services/sequencer/impl/actions/utils/ReturnSuccessWithDataNode";
import CreateSessionSequenceNode from "../../../../services/sequencer/impl/actions/CreateSessionSequenceNode";
import GetUserByEmailVerificationTokenSequenceNode
    from "../../../../services/sequencer/impl/actions/GetUserByEmailVerificationTokenSequenceNode";

class PostUserVerifyEmailRoute implements IRoute {
    readonly path: string;
    readonly databaseQuery: DatabaseQuery;

    constructor(path: string, databaseQuery: DatabaseQuery) {
        this.path = path;
        this.databaseQuery = databaseQuery;
    }

    initialize = async (expressApp: Express): Promise<void> => {
        let firstNode = new StartSequenceNode();
        firstNode
            .append(
                new PopulateRequestInputFieldsInRecordsSequenceNode(["verificationToken"])
            )
            .append(
                new GetUserByEmailVerificationTokenSequenceNode(
                    new ReturnErrCodeSequenceNode("ERRCODE_USER_NOT_FOUND", []),
                    this.databaseQuery,
                    "verificationToken",
                    "user"
                )
            )
            .append(
                new ValidateVerificationTokenSequenceNode(
                    this.getVerifyUserEmailSequence(),
                    new ReturnErrCodeSequenceNode("ERRCODE_VALIDATION_VERIFICATION_TOKEN", []),
                    "verificationToken"
                )
            )

        expressApp.post(this.path, (req: Request, res: Response) => {
            firstNode.execute(SequenceNodeExecuteData.empty(req, res))
        });
    }

    getVerifyUserEmailSequence = (): SequenceNode => {
        let verifyNode = new VerifyUserEmailSequenceNode(
            new ReturnErrCodeSequenceNode("ERRCODE_VERIFICATION_FAILED", []),
            this.databaseQuery,
            "verificationToken"
        );
        verifyNode.append(
            new CreateSessionSequenceNode(
                new ReturnErrCodeSequenceNode("ERRCODE_CREATE_SESSION_FAILED", []),
                this.databaseQuery,
                "user",
                "session"
            )
        )
        .append(
            new ReturnSuccessWithDataNode(["session"])
        );

        return verifyNode;
    }
}


export default PostUserVerifyEmailRoute;