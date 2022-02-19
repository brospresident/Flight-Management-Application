import mongoose from 'mongoose';
import Flight from '../../controllers/Flight/Flight.interface';

const flightSchema = new mongoose.Schema({
    id: Number,
    fromCountry: String,
    fromCity: String,
    toCountry: String,
    toCity: String,
    date: String,
    price: Number,
    availableSeats: Number,
    reservedSeats: Number
});

export default mongoose.model<Flight & mongoose.Document>('Flight', flightSchema);