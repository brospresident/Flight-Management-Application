import dotenv, { DotenvConfigOptions } from 'dotenv'

const dotenvConfig: DotenvConfigOptions = {
    path: __dirname + '/.env'
}
dotenv.config(dotenvConfig);

const PORT: number = parseInt(process.env.PORT as string, 10) || 3001;
const MONGO_URI: string = process.env.MONGO_URI as string;
const HASH_ROUNDS: number = parseInt(process.env.HASH_ROUNDS as string, 10) || 10;
const JWT_SECRET: string = process.env.JWT_SECRET as string;

export {
    PORT,
    MONGO_URI,
    HASH_ROUNDS,
    JWT_SECRET
}