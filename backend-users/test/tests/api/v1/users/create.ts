import {TestFrameworkRoute} from "../../../../testframework/TestFramework";

class TestUserCreate extends TestFrameworkRoute{
    name = "/api/v1/users/create";

    execute = async (): Promise<void> => {
        const response = await this.post(this.getRouteUrl("/api/v1/user/create"), {
            username: "sampleuser" + this.randomString(10),
            password: "samplepassword8511"+ this.randomString(10),
            email: "testdj1-jd-012j-0j-021dj-0@gmail.com"
        })
        await this.assertResponseJsonContent(response, {
            isError: false,
            message: "",
            data: {}
        })
    }
}

export default TestUserCreate;