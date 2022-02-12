import HttpException from "./Http";

export default class UserInvalid extends HttpException {
    public constructor () {
        super(400, `Data you provided does not match!`);
    }
}