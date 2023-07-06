import { Request, Response } from 'express';

class SequenceNodeExecuteData {
    request: Request
    response: Response;
    data: Record<string, any> = {};

    constructor(request: Request, response: Response, data?: Record<string, any>) {
        this.request = request;
        this.response = response;
        this.data = arguments[2];
    }

    static empty(request: Request, response: Response): SequenceNodeExecuteData {
        return new SequenceNodeExecuteData(request, response, {});
    }
}

export default SequenceNodeExecuteData;