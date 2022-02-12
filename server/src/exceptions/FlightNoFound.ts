import HttpException from "./Http";

export default class FlightNotFound extends HttpException {
    public constructor() {
        super(404, 'There is no flight with your data.');
    }
}