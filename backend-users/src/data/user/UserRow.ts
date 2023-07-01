class UserRow {
    uuid: string = "";
    username: string = "";
    email: string = "";
    password: string = "";
    create_time: Date;

    constructor(uuid: string, username: string, email: string, password: string, create_time: Date) {
        this.uuid = uuid;
        this.username = username;
        this.email = email;
        this.password = password;
        this.create_time = create_time;
    }
}

export default UserRow