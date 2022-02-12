import HttpException from "./Http";

export default class UserAlreadyExists extends HttpException {
    public constructor (name: string) {
        super(409, `User with name ${name} already exists!`);
    }
}