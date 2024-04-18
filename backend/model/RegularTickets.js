import mongoose from 'mongoose';
const { Schema, } = mongoose;

const regularTicketSchema = new Schema({
    userId: { type: String, required: true},
    sourceStation: { type: Object, required: true },
    destinationStation: { type: Object, required: true },
    numberOfPassengers: { type: Number, required: true },
    distance: { type: Number, required: true },
    amount: { type: Number, required: true },
    isPaid: { type: Boolean, default: true, default: false },
    issuedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: Date.now },
});

const RegularTicket = mongoose.model('regularTicket ', regularTicketSchema);

export default RegularTicket;