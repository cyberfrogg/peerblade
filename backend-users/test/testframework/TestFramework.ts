import axios from "axios";
import crypto from "crypto";

class TestFrameworkTest {
    name: string = "";
    isFail: boolean = false;
    message: string = "";

    execute = async (): Promise<void> => {
        console.log("Test " + this.name +" implemented")
    }

    setFail = (): TestFrameworkTest => {
        this.isFail = true;
        return this;
    }
    setMessage = (message: string): TestFrameworkTest => {
        this.message = message;
        return this;
    }

    get = async (url: string, data: any): Promise<any> => {
        return axios.get(url, {
            params: data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    post = async (url: string, data: any): Promise<any> => {
        console.log(url);
        return axios.post(url, data);
    }
    assertResponseJsonContent = async (response: any, expected: any): Promise<TestFrameworkTest> => {
        const expectedJson = JSON.stringify(expected);
        const responseJsonData = await response.data;
        const responseJson = JSON.stringify(responseJsonData);

        if(!this.isFail && expectedJson != responseJson){
            this.message = "Failed to validate json \n Expected: \n " + expectedJson + " \n \n But received: \n " + responseJson;
            this.isFail = true;
        }

        return this;
    }

    randomString = (length: number): string => {
        return crypto.randomBytes(length).toString("hex");
    }
}

class TestFrameworkRoute extends TestFrameworkTest{
    getRouteUrl = (endpointPart: string): string => {
        return "http://localhost:5001" + endpointPart;
    }
}

const RunTests = async (allTests: TestFrameworkTest[]): Promise<void> => {
    let countOfErrors = 0;

    for (let i = 0; i < allTests.length; i++) {
        try{
            await allTests[i].execute();
        }catch (e){
            console.error("\x1b[31m Test [" + allTests[i].name + "] FAILED with exception: ");
            console.error(e);
            countOfErrors++;
            continue;
        }

        if(allTests[i].isFail){
            console.error("\x1b[31m Test [" + allTests[i].name + "] FAILED with message: ");
            console.error(allTests[i].message);
            countOfErrors++;
        }
        else{
            console.log("\x1b[32mTest [" + allTests[i].name + "] PASSED");
        }
    }

    const isFailed = countOfErrors != 0;

    console.log(isFailed ? "\x1b[31m" : "\x1b[32m");

    console.log("-------------");
    console.log("Passed " + (allTests.length - countOfErrors) + "/" + allTests.length);
    console.log("-------------");
    console.log("\x1b[37m");
    process.exit(isFailed ? 0 : 1);
}


export { TestFrameworkRoute, TestFrameworkTest, RunTests };