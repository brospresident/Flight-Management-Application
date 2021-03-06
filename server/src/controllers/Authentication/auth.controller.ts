import express from 'express';
import IController from "../controller";
import bcrypt from 'bcrypt';
import UserAlreadyExists from '../../exceptions/UserAlreadyExists';
import UserNotFound from '../../exceptions/UserNotFound';
import UserInvalid from '../../exceptions/UserInvalid';
import { HASH_ROUNDS } from '../../utils/EnvLoader';
import User from '../User/user.interface';
import userModel from '../../model/User/user.model';
import {
    TokenData,
    JWT
} from '../../utils/JWT';

class AuthController implements IController {
    public path = '/auth';
    public router = express.Router();

    private readonly UserModel = userModel;
    private readonly jwt: JWT = JWT.getInstance();
    
    public constructor () {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.post(`${this.path}/login`, this.login);
        this.router.post(`${this.path}/register`, this.register);
    }

    private register = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        const data = req.body;

        const user = await this.UserModel.findOne({
            username: data.username
        });

        if (user) {
            return next(new UserAlreadyExists(data.username));
        }

        const hashedPassword: string = await bcrypt.hash(data.password, HASH_ROUNDS);

        const newUser = await this.UserModel.create({
            username: data.username,
            password: hashedPassword,
            email: data.email,
            balance: 0,
            isOperator: false,
            reservedFlights: []
        });
        newUser.password = '';
        const tokenData: TokenData = this.jwt.generateToken(newUser);
        res.setHeader('Set-Cookie', [`Authorization ${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`]);
        res.status(200).json(newUser);
    }

    private login = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        const data = req.body;

        const user = await this.UserModel.findOne({
            username: data.username
        });

        if (!user) {
            return next(new UserNotFound(data.username));
        }
        else if (await bcrypt.compare(data.password, user.password)) {
            user.password = '';
            const tokenData: TokenData = this.jwt.generateToken(user);
            res.setHeader('Set-Cookie', [`Authorization ${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`]);
            res.status(200).json(user);
        }
        else {
            return next(new UserInvalid());
        }
    }

    
}

export default AuthController;
