import IController from "../controller";
import express, { Router } from 'express';
import FlightModel from "../../model/Flight/Flight.model";
import FlightNotFound from "../../exceptions/FlightNoFound";
import Flight from './Flight.interface';
import DateInPast from '../../exceptions/DateInPast'

class FlightController implements IController {
    public path: string = '/flight';
    public router: express.Router;

    public constructor() {
        this.router = express.Router();

        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/', this.getFlightInformation);
        this.router.post('/', this.createFlight);
    }

    private async getFlightInformation(req: express.Request, res: express.Response, next: express.NextFunction) {
        const fromCountry: string = req.query?.fromCountry as string || "";
        const fromCity: string = req.query?.fromCountry as string || "";
        const toCountry: string = req.query?.toCountry as string || "";
        const toCity: string = req.query?.toCity as string || "";

        const response = await FlightModel.find({
            fromCountry: fromCountry,
            fromCity: fromCity,
            toCountry: toCountry,
            toCity: toCity
        });

        if (!response) {
            return next(new FlightNotFound());
        }

        return response;
    }

    private async createFlight(req: express.Request<Flight>, res: express.Response, next: express.NextFunction) {
        const data: Flight = req.body;
        if (this.checkDate(data.date) == false) {
            return next(new DateInPast());
        }

        const newFlight = await FlightModel.create(data);

        return res.status(200).json(newFlight);
    }

    private checkDate(date: string): boolean {
        try {
            const now = new Date();
            const dateToCheck = new Date(date);

            if (dateToCheck.getTime() < now.getTime()) {
                throw "Date is in the past";
            }
        }
        catch (e) {
            return false;
        }

        return true;
    }
}

export default FlightController;