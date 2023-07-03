import {Express, Request, Response} from "express";
import IRoute from "../../../../services/routes/IRoute";
import StartSequenceNode from "../../../../services/sequencer/impl/actions/utils/StartSequenceNode";
import SequenceNodeExecuteData from "../../../../services/sequencer/SequenceNodeExecuteData";
import ReturnSuccessWithDataNode from "../../../../services/sequencer/impl/actions/utils/ReturnSuccessWithDataNode";
import ReturnErrCodeSequenceNode from "../../../../services/sequencer/impl/actions/utils/ReturnErrCodeSequenceNode";
import ValidateIsUserExistsSequenceNode
    from "../../../../services/sequencer/impl/validators/ValidateIsUserExistsSequenceNode";
import DatabaseQuery from "../../../../services/database/DatabaseQuery";
import PopulateRequestInputFieldsInRecordsSequenceNode
    from "../../../../services/sequencer/impl/actions/utils/PopulateRequestInputFieldsInRecordsSequenceNode";
import ValidateUsernameSequenceNode
    from "../../../../services/sequencer/impl/validators/input/ValidateUsernameSequenceNode";
import ValidatePasswordSequenceNode
    from "../../../../services/sequencer/impl/validators/input/ValidatePasswordSequenceNode";
import ValidateEmailSequenceNode from "../../../../services/sequencer/impl/validators/input/ValidateEmailSequenceNode";
import CreateUserSequenceNode from "../../../../services/sequencer/impl/actions/CreateUserSequenceNode";
import SendUserVerificationEmailSequenceNode
    from "../../../../services/sequencer/impl/actions/SendUserVerificationEmailSequenceNode";
import CreateUserEmailVerificationTokenSequenceNode
    from "../../../../services/sequencer/impl/actions/CreateUserEmailVerificationTokenSequenceNode";
import SequenceNode from "../../../../services/sequencer/SequenceNode";
import ValidateIsUserEmailVerifiedSequenceNode
    from "../../../../services/sequencer/impl/validators/ValidateIsUserEmailVerifiedSequenceNode";
import DeleteUserSequenceNode from "../../../../services/sequencer/impl/actions/DeleteUserSequenceNode";

class PostUserCreateRoute implements IRoute {
    readonly path: string;
    readonly databaseQuery: DatabaseQuery;

    constructor(path: string, databaseQuery: DatabaseQuery) {
        this.path = path;
        this.databaseQuery = databaseQuery;
    }

    initialize = async (expressApp: Express): Promise<void> => {
        let createUserNode = this.getCreateUserNode();

        let recreateUserOnEmailVerificationFalse = new DeleteUserSequenceNode(
            createUserNode,
            this.databaseQuery,
            "discoveredUser"
            );
        recreateUserOnEmailVerificationFalse
            .append(
                createUserNode
            )

        let firstNode = new StartSequenceNode();
        firstNode
            .append(
                new PopulateRequestInputFieldsInRecordsSequenceNode(["username", "email", "password"])
            )
            .append(
                new ValidateUsernameSequenceNode(
                    new ValidatePasswordSequenceNode(
                        new ValidateEmailSequenceNode(
                            new ValidateIsUserExistsSequenceNode(
                                new ValidateIsUserEmailVerifiedSequenceNode(
                                    new ReturnErrCodeSequenceNode("ERRCODE_USER_EXISTS", []),
                                    recreateUserOnEmailVerificationFalse,
                                    new ReturnErrCodeSequenceNode("ERRCODE_USER_IS_EMAIL_VERIFIED_CHECK_FAILED", []),
                                    this.databaseQuery,
                                    "discoveredUser",
                                    "discoveredEmailVerificationToken"
                                ),
                                createUserNode,
                                new ReturnErrCodeSequenceNode("ERRCODE_USER_EXISTS_CHECK_FAILED", []),
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

    getCreateUserNode = (): SequenceNode => {
        let createUserNode = new CreateUserSequenceNode(
            new ReturnErrCodeSequenceNode("ERRCODE_USER_CREATE_FAILED", []),
            this.databaseQuery,
            "username",
            "email",
            "password",
            "createdUser"
        );
        createUserNode
        .append(
            new CreateUserEmailVerificationTokenSequenceNode(
                new ReturnErrCodeSequenceNode("ERRCODE_USER_VERIFICATION_TOKEN_CREATE_FAILED", []),
                this.databaseQuery,
                "createdUser",
                "userEmailVerificationToken"
            )
        )
        .append(
            new SendUserVerificationEmailSequenceNode(
                new ReturnErrCodeSequenceNode("ERRCODE_USER_VERIFICATION_TOKEN_EMAIL_SEND_FAILED", []),
                "createdUser",
                "userEmailVerificationToken"
            )
        )
        .append(
            new ReturnSuccessWithDataNode([])
        );

        return createUserNode;
    }
}


export default PostUserCreateRoute;