class ApiResponseData<TDataType> {
    isError: boolean = false;
    message: string = "";
    data: TDataType;

    constructor(isError: boolean, message: string, data?: TDataType) {
        this.isError = isError;
        this.message = message;
        this.data = arguments[2];
    }

    static Success<TDataType>(data?: TDataType): ApiResponseData<TDataType> {
        return new ApiResponseData(false, "", data);
    }

    static Error<TDataType>(message: string, data?: TDataType): ApiResponseData<TDataType> {
        return new ApiResponseData(true, message, data);
    }
}

export default ApiResponseData;