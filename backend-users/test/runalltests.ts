import {RunTests} from "./testframework/TestFramework";
import TestPing from "./tests/api/v1/ping";
import TestUserCreate from "./tests/api/v1/users/create";

const RunAll = async (): Promise<void> => {
    await RunTests([
        new TestPing(),
        new TestUserCreate()
    ]);
}

RunAll();