import { Request, Response } from 'express';

class SequenceNodeExecuteData {
    request: Request
    response: Response;
    type: string;
    data: any;

    constructor(type: string, request: Request, response: Response, data?: any) {
        this.type = type;
        this.request = request;
        this.response = response;
        this.data = arguments[3];
    }

    static empty(request: Request, response: Response): SequenceNodeExecuteData {
        return new SequenceNodeExecuteData("empty", request, response);
    }
}

export default SequenceNodeExecuteData;