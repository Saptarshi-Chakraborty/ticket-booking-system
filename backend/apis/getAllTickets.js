import RegularTicket from "../model/RegularTickets.js";
import GLOBALS from "../CONSTANTS.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

async function fetchAllTickets(req, res) {
    const { AUTH_TOKEN } = req.body;

    if (!AUTH_TOKEN) {
        return res.json({ "status": "error", "type": "unauthorized", "msg": "Unauthorized access" });
    }

    // verify the token
    const encryptionSecret = process.env.AUTH_TOKEN_SECRET;
    let decodedData = null;

    await jwt.verify(AUTH_TOKEN, encryptionSecret, (err, decoded) => {
        if (err) {
            return res.json({ "status": "error", "type": "unauthorized", "msg": "Unauthorized access" });
        }

        decodedData = decoded;
    });
    console.log(decodedData);

    const connection = await mongoose.connect(GLOBALS.mongoURI);

    if (!connection) {
        console.log("MongoDB connection failed");
        res.status(500).json({ "status": "error", "msg": "Internal Server Error" });
    }

    const userId = decodedData.id;

    //   fetch all tickets data from the database except __v and _id field
    const RegularTickets = await RegularTicket.find({ userId }, { __v: 0});

    console.log("RegularTickets");
    console.log(RegularTickets);

    res.json({ "status": "success", "msg": "Tickets fetched successfully", "unreservedTickets": RegularTickets, "reservedTickets": [] });
}

export default fetchAllTickets;