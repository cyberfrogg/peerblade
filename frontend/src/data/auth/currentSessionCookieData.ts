export default class CurrentSessionCookieData {
    Id: string = "";
    UserId: string = "";
    Token: string = "";
    CreateTime: Date;

    constructor(id: string, userId: string, token: string, createTime: Date) {
        this.Id = id;
        this.UserId = userId;
        this.Token = token;
        this.CreateTime = createTime;
    }
}