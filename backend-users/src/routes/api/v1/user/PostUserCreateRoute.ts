import { Express, Request, Response } from "express";
import IRoute from "../../../../services/routes/IRoute";
import StartSequenceNode from "../../../../services/sequencer/impl/actions/utils/StartSequenceNode";
import SequenceNodeExecuteData from "../../../../services/sequencer/SequenceNodeExecuteData";
import ReturnSuccessWithDataNode from "../../../../services/sequencer/impl/actions/utils/ReturnSuccessWithDataNode";
import ReturnErrCodeSequenceNode from "../../../../services/sequencer/impl/actions/utils/ReturnErrCodeSequenceNode";
import ValidateUserExistsSequenceNode from "../../../../services/sequencer/impl/validators/ValidateUserExistsSequenceNode";
import DatabaseQuery from "../../../../services/database/DatabaseQuery";
import PopulateRequestInputFieldsInRecordsSequenceNode from "../../../../services/sequencer/impl/actions/utils/PopulateRequestInputFieldsInRecordsSequenceNode";
import ValidateUsernameSequenceNode from "../../../../services/sequencer/impl/validators/input/ValidateUsernameSequenceNode";
import ValidatePasswordSequenceNode from "../../../../services/sequencer/impl/validators/input/ValidatePasswordSequenceNode";
import ValidateEmailSequenceNode from "../../../../services/sequencer/impl/validators/input/ValidateEmailSequenceNode";

class PostUserCreateRoute implements IRoute {
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
                new PopulateRequestInputFieldsInRecordsSequenceNode(["username", "email", "password"])
            )
            .append(
                new ValidateUsernameSequenceNode(
                    new ValidatePasswordSequenceNode(
                        new ValidateEmailSequenceNode(
                            new ValidateUserExistsSequenceNode(
                                new ReturnSuccessWithDataNode([]),
                                new ReturnErrCodeSequenceNode("ERRCODE_USER_EXISTS", []),
                                undefined,
                                this.databaseQuery,
                                "discoveredUser",
                                "username",
                                "email"
                            ),
                            new ReturnErrCodeSequenceNode("ERRCODE_VALIDATION_FAIL_EMAIL", []),
                            "email"
                        ),
                        new ReturnErrCodeSequenceNode("ERRCODE_VALIDATION_FAIL_PASSWORD", []),
                        "password"
                    ),
                    new ReturnErrCodeSequenceNode("ERRCODE_VALIDATION_FAIL_USERNAME", []),
                    "username"
                )
            )

        expressApp.post(this.path, (req: Request, res: Response) => {
            firstNode.execute(new SequenceNodeExecuteData("userCreateResponse", req, res, {}))
        });
    }
}

export default PostUserCreateRoute;