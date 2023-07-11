import {Express, Request, Response} from "express";
import IRoute from "../../../../services/routes/IRoute";
import StartSequenceNode from "../../../../services/sequencer/impl/actions/utils/StartSequenceNode";
import SequenceNodeExecuteData from "../../../../services/sequencer/SequenceNodeExecuteData";
import ReturnErrCodeSequenceNode from "../../../../services/sequencer/impl/actions/utils/ReturnErrCodeSequenceNode";
import DatabaseQuery from "../../../../services/database/DatabaseQuery";
import PopulateRequestInputFieldsInRecordsSequenceNode from "../../../../services/sequencer/impl/actions/utils/PopulateRequestInputFieldsInRecordsSequenceNode";
import GetUserByEmailSequenceNode from "../../../../services/sequencer/impl/actions/GetUserByEmailSequenceNode";
import GetUserByUsernameSequenceNode from "../../../../services/sequencer/impl/actions/GetUserByUsernameSequenceNode";
import ExtractPasswordSaltValueFromUserSequenceNode
    from "../../../../services/sequencer/impl/actions/ExtractPasswordSaltValueFromUserSequenceNode";
import BooleanEquationSequenceNode
    from "../../../../services/sequencer/impl/validators/utils/BooleanEquationSequenceNode";
import SaltValuePair from "../../../../services/utils/SaltValuePair";
import ReturnSuccessWithDataNode from "../../../../services/sequencer/impl/actions/utils/ReturnSuccessWithDataNode";

class PostUserLoginRoute implements IRoute {
    readonly path: string;
    readonly databaseQuery: DatabaseQuery;

    constructor(path: string, databaseQuery: DatabaseQuery) {
        this.path = path;
        this.databaseQuery = databaseQuery;
    }

    initialize = async (expressApp: Express): Promise<void> => {
        // user get
        let onUserGetSuccess = new ExtractPasswordSaltValueFromUserSequenceNode(
            "user",
            "userPasswordSaltValue"
        )
        onUserGetSuccess.append(
            new BooleanEquationSequenceNode(
                new ReturnSuccessWithDataNode([]),
                new ReturnErrCodeSequenceNode("ERRCODE_AUTH_FAILED", []),
                (data: SequenceNodeExecuteData) => {
                    let password = data.data["password"];
                    let userSaltValue = data.data["userPasswordSaltValue"] as SaltValuePair;
                    let inputPasswordSaltValue = SaltValuePair.CreateFromSalt(userSaltValue.Salt, password);
                    return userSaltValue.IsEqualsTo(inputPasswordSaltValue);
                }
            )
        );

        // by email
        let loginByEmail = new GetUserByEmailSequenceNode(
            new ReturnErrCodeSequenceNode("ERRCODE_AUTH_FAILED", []),
            this.databaseQuery,
            "login",
            "user"
        );
        loginByEmail.append(onUserGetSuccess);

        // by username
        let loginByUsername = new GetUserByUsernameSequenceNode(
            loginByEmail,
            this.databaseQuery,
            "login",
            "user"
        );
        loginByUsername.append(onUserGetSuccess);



        let firstNode = new StartSequenceNode();
        firstNode
            .append(
                new PopulateRequestInputFieldsInRecordsSequenceNode(["login", "password"])
            )
            .append(
                loginByUsername
            )

        expressApp.post(this.path, (req: Request, res: Response) => {
            firstNode.execute(SequenceNodeExecuteData.empty(req, res))
        });
    }
}


export default PostUserLoginRoute;