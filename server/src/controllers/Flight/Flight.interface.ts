export default interface Flight {
    id?: number;
    fromCountry: string;
    fromCity: string;
    toCountry: string;
    toCity: string;
    date: string;
    price: number;
    availableSeats: number;
    reservedSeats?: number;
}