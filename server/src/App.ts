import express from 'express';
import bodyParser from 'body-parser';
import IController from './controllers/controller';
import mongoose from 'mongoose';
import { MONGO_URI } from './utils/EnvLoader';
import errorMiddleware from './middleware/errorHandling';
import cookieParser from 'cookie-parser';
import countriesData from './utils/CountriesData';

class App {
    private app: express.Application;
    private readonly port: number;

    public constructor (port: number, controllers: IController[]) {
        this.app = express();
        this.port = port;

        this.initMiddlewares();
        this.initControllers(controllers);
        this.initMongoConnection();
        this.handleMongoErrors();

        countriesData.getCountries();
    }

    private initMiddlewares(): void {
        this.app.use(express.json());
        // this.app.use(bodyParser.json());
        this.app.use(errorMiddleware);
        this.app.use(cookieParser());
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Fligth reservation API listening on port ${this.port}`);
        });
    }

    private initControllers(controllers: IController[]): void {
        for (const c of controllers) {
            this.app.use('/api', c.router);
        }
    }

    private async initMongoConnection(): Promise<void> {
        try {
            await mongoose.connect(MONGO_URI);
        }
        catch (err) {
            console.log(err);
        }
    }

    private handleMongoErrors(): void {
        mongoose.connection.once('open', () => console.log(`Mongo connection started at ${new Date}`));
        mongoose.connection.on('error', (err) => {
            console.log(err);
        });
    }
}

export default App;