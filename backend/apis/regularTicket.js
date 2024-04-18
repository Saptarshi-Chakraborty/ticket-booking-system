import jwt from 'jsonwebtoken';
import RegularTicket from '../model/RegularTickets.js';
import GLOBALS from '../CONSTANTS.js';
import mongoose from 'mongoose';

async function createRegularTicket(req, res) {

    let { sourceStationName, sourceStationCode, destinationStationName, destinationStationCode, numberOfPassenger, userId, fare, distance } = req.body;

    // validate the request
    if (!sourceStationName || !sourceStationCode || !destinationStationName || !destinationStationCode || !numberOfPassenger || userId === undefined || !fare || !distance) {
        return res.json({ "status": "error", "message": "Invalid request" });
    }

    // insert into database
    const connection = await mongoose.connect(GLOBALS.mongoURI);

    if (!connection) {
        console.log("MongoDB connection failed");
        res.status(500).json({ "status": "error", "msg": "Internal Server Error" });
    }

    userId = (userId == null) ? "null" : userId;

    const newTicket = new RegularTicket({ userId, sourceStation: { name: sourceStationName, code: sourceStationCode }, destinationStation: { name: destinationStationName, code: destinationStationCode }, numberOfPassengers: numberOfPassenger, distance, amount: fare });
    const result = await newTicket.save();

    if (!result) {
        res.status(500).json({ "status": "error", "msg": "Internal Server Error" });
    }
    console.log(result);

    // create token

    const secret = process.env.TICKET_ENCRYPTION_SECRET;

    // create a new ticket with jwt token
    const token = jwt.sign({ id: result._id, sourceStationName, sourceStationCode, destinationStationName, destinationStationCode, numberOfPassenger, userId, fare, distance, type: "Unreserved" }, secret, { expiresIn: '24h' });

    // send the token to the user
    res.json({ "status": "success", "message": "Ticket created successfully", "data": token, id: result._id });
}

export default createRegularTicket;
