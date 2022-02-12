import IController from "../controller";
import express from 'express';
import FlightModel from "../../model/Flight/Flight.model";
import FlightNotFound from "../../exceptions/FlightNoFound";

class FlightController implements IController {
    public path: string = '/flight';
    public router: express.Router;

    public constructor() {
        this.router = express.Router();

        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/', this.getFlightInformation);
    }

    private async getFlightInformation(req: express.Request, res: express.Response, next: express.NextFunction) {
        const from: string = req.query?.from as string || "";
        const to: string = req.query?.to as string || "";

        const response = await FlightModel.find({
            from: from,
            to: to
        });

        if (!response) {
            return next(new FlightNotFound());
        }

        return response;
    }

    private doesCityExist(city: string): boolean {

        return true;
    }
}