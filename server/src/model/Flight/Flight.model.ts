import mongoose from 'mongoose';
import Flight from '../../controllers/Flight/Flight.interface';

const flightSchema = new mongoose.Schema({
    id: Number,
    from: String,
    to: String,
    date: String,
    price: Number,
    availableSeats: Number,
    reservedSeats: Number
});

export default mongoose.model<Flight>('Flight', flightSchema);