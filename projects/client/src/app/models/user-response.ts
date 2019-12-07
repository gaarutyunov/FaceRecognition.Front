export class UserResponse {
    public readonly id: string;
    public readonly login: string;

    constructor(id: string, login: string) {
        this.id = id;
        this.login = login;
    }
}
