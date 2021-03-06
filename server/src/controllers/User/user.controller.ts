import express from 'express';
import IController from '../controller';
import userModel from '../../model/User/user.model';
import UserNotFound from '../../exceptions/UserNotFound';

class UserController implements IController {
    public path: string;
    public router: express.Router;

    public constructor (path: string) {
        this.path = path;
        this.router = express.Router();

        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(`${this.path}/:name`, this.getUserInfo);
        this.router.patch(`${this.path}/:name`, this.addFunds);
    }

    private getUserInfo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const name = req.params?.name;

        const resp = await userModel.findOne({
            username: name
        });

        if (!resp) {
            next(new UserNotFound(name));
        }

        return res.status(200).json(resp);
    }

    private addFunds = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const headers = req.headers;
        const auth = headers.authorization;
        
    }
}

export default UserController;