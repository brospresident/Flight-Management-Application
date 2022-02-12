import HttpException from "./Http";

class UserNotFound extends HttpException {
    public constructor (name: string) {
        super(404, `User with ${name} not found!`);
    }
}

export default UserNotFound;