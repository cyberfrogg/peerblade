class EmailVerificationTokenRow {
    uuid: string = "";
    useruuid: string = "";
    token: string = "";
    isverified: Number = 0;
    create_time: Date;

    constructor(uuid: string, useruuid: string, token: string, isverified: Number, create_time: Date) {
        this.uuid = uuid;
        this.useruuid = useruuid;
        this.token = token;
        this.isverified = isverified;
        this.create_time = create_time;
    }
}

export default EmailVerificationTokenRow