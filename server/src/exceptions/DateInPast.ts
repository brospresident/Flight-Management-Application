import HttpException from "./Http";

export default class DateInPast extends HttpException {
    public constructor () {
        super(201, "Date cannot be in the past!");
    }
}