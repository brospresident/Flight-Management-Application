import IController from "../controller";
import express from 'express';
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
        this.router.get(`${this.path}/`, this.getFlightInformation);
        this.router.post(`${this.path}/`, this.createFlight);
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
            next(new FlightNotFound());
        }

        return response;
    }

    private async createFlight(req: express.Request, res: express.Response, next: express.NextFunction) {
        const data: Flight = req.body;
        data.reservedSeats = 0;

        const now = new Date();
        const flightDate = new Date(data.date);

        if (flightDate.getTime() < now.getTime()) {
            return next(new DateInPast());
        }
        
        const newFlight = await FlightModel.create(data);

        return res.status(200).json(newFlight);
    }
}

export default FlightController;