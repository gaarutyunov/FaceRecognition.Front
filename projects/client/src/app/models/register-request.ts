export class RegisterRequest {
    public readonly login: string;
    public readonly password: string;
    public readonly file: string;

    constructor(login: string, password: string, file: string) {
        this.login = login;
        this.password = password;
        this.file = file;
    }
}
