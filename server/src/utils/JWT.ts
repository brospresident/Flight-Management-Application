import jwt from 'jsonwebtoken';
import User from '../controllers/User/user.interface';
import { JWT_SECRET } from './EnvLoader';

export interface TokenData {
    expiresIn: number;
    token: string;
}

export interface DataInsideToken {
    username: string;
}

export class JWT {
    public static instance: JWT;
    private constructor () {}
    
    public static getInstance (): JWT {
        if (!JWT.instance) {
            JWT.instance = new JWT();
        }
        return JWT.instance;
    }

    public generateToken = (user: User): TokenData => {
        const expiresIn = 360;
        const tokenData: DataInsideToken = {
            username: user.username
        };

        const token: TokenData = {
            expiresIn,
            token: jwt.sign(tokenData, JWT_SECRET, { expiresIn })
        }
        return token;
    }

    public verify = (token: string): any => {
        return jwt.verify(token, JWT_SECRET);
    }
}