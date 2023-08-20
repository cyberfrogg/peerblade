import {Express, Request, Response} from "express";
import IRoute from "../../../../services/routes/IRoute";
import StartSequenceNode from "../../../../services/sequencer/impl/actions/utils/StartSequenceNode";
import SequenceNodeExecuteData from "../../../../services/sequencer/SequenceNodeExecuteData";
import ReturnErrCodeSequenceNode from "../../../../services/sequencer/impl/actions/utils/ReturnErrCodeSequenceNode";
import DatabaseQuery from "../../../../services/database/DatabaseQuery";
import PopulateRequestInputFieldsInRecordsSequenceNode from "../../../../services/sequencer/impl/actions/utils/PopulateRequestInputFieldsInRecordsSequenceNode";
import GetUserByEmailSequenceNode from "../../../../services/sequencer/impl/actions/GetUserByEmailSequenceNode";
import GetUserByUsernameSequenceNode from "../../../../services/sequencer/impl/actions/GetUserByUsernameSequenceNode";
import ExtractPasswordSaltValueFromUserSequenceNode from "../../../../services/sequencer/impl/actions/ExtractPasswordSaltValueFromUserSequenceNode";
import BooleanEquationSequenceNode from "../../../../services/sequencer/impl/validators/utils/BooleanEquationSequenceNode";
import SaltValuePair from "../../../../services/utils/SaltValuePair";
import ReturnSuccessWithDataNode from "../../../../services/sequencer/impl/actions/utils/ReturnSuccessWithDataNode";
import HashFromSaltValueSequenceNode from "../../../../services/sequencer/impl/actions/HashFromSaltValueSequenceNode";
import CreateSessionSequenceNode from "../../../../services/sequencer/impl/actions/CreateSessionSequenceNode";
import SequenceNode from "../../../../services/sequencer/SequenceNode";

class PostUserLoginRoute implements IRoute {
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
                new PopulateRequestInputFieldsInRecordsSequenceNode(["login", "password"])
            )
            .append(
                this.getLoginMethod()
            )

        expressApp.post(this.path, (req: Request, res: Response) => {
            firstNode.execute(SequenceNodeExecuteData.empty(req, res))
        });
    }

    getLoginMethod = (): SequenceNode => {
        // second in queue
        // by email
        let loginByEmail = new GetUserByEmailSequenceNode(
            new ReturnErrCodeSequenceNode("ERRCODE_AUTH_FAILED", []),
            this.databaseQuery,
            "login",
            "user"
        );
        loginByEmail.append(this.getLoginOnUserGetSuccess());

        // first in queue
        // by username
        let loginByUsername = new GetUserByUsernameSequenceNode(
            loginByEmail,
            this.databaseQuery,
            "login",
            "user"
        );
        loginByUsername.append(this.getLoginOnUserGetSuccess());

        return loginByUsername;
    }

    getLoginOnUserGetSuccess = (): SequenceNode => {



        let onUserGetSuccess = new ExtractPasswordSaltValueFromUserSequenceNode(
            "user",
            "userPasswordSaltValue"
        )
        onUserGetSuccess.append(
            new HashFromSaltValueSequenceNode(
                "password",
                "userPasswordSaltValue",
                "passwordWithSalt"
            )
        )
        .append(
            new BooleanEquationSequenceNode(
                this.getCreateSession(),
                new ReturnErrCodeSequenceNode("ERRCODE_AUTH_FAILED", []),
                (data: SequenceNodeExecuteData) => {
                    let userSaltValue = data.data["userPasswordSaltValue"] as SaltValuePair;
                    let passwordSaltValue = data.data["passwordWithSalt"] as SaltValuePair;
                    return userSaltValue.IsEqualsTo(passwordSaltValue);
                }
            )
        );

        return onUserGetSuccess;
    }

    getCreateSession = (): SequenceNode => {
        let createSession = new CreateSessionSequenceNode(
            new ReturnErrCodeSequenceNode("ERRCODE_CREATE_SESSION_FAILED", []),
            this.databaseQuery,
            "user",
            "session"
        );

        createSession.append(
            new ReturnSuccessWithDataNode(["session"])
        );

        return createSession;
    }
}





export default PostUserLoginRoute;