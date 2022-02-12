import HttpException from "./Http";

export default class WrongAuthToken extends HttpException {
    public constructor (name: string) {
        super(401, `Wrong token for user ${name}!`);
    }
}