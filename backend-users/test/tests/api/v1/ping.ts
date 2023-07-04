import {TestFrameworkRoute} from "../../../testframework/TestFramework";

class TestPing extends TestFrameworkRoute{
    name = "/api/v1/ping";

    execute = async (): Promise<void> => {
        const response = await this.get(this.getRouteUrl("/api/v1/ping"), {})
        await this.assertResponseJsonContent(response, {
            isError: false,
            message: "",
            data: {}
        })
    }
}

export default TestPing;