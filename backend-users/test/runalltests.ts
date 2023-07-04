import {RunTests} from "./testframework/TestFramework";
import TestPing from "./tests/api/v1/ping";


const RunAll = async (): Promise<void> => {
    await RunTests([
        new TestPing()
    ]);
}

RunAll();