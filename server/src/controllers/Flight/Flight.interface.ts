export default interface Flight {
    id: number;
    from: string;
    to: string;
    date: string;
    price: number;
    availableSeats: number;
    reservedSeats: number;
}