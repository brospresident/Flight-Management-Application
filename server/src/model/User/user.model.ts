import mongoose from 'mongoose';
import User from '../../controllers/User/user.interface';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    balance: Number,
    isOperator: Boolean,
    reservedFlights: Array
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);
export default userModel;