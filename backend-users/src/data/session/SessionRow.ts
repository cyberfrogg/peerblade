class SessionRow {
    uuid: string = "";
    useruuid: string = "";
    token: string = "";
    create_time: Date;

    constructor(uuid: string, useruuid: string, token: string, create_time: Date) {
        this.uuid = uuid;
        this.useruuid = useruuid;
        this.token = token;
        this.create_time = create_time;
    }
}

export default SessionRow