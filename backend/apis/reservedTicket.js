import jwt from 'jsonwebtoken';

async function createReservedTicket(req, res) {

    const { sourceStationName, sourceStationCode, destinationStationName, destinationStationCode, numberOfPassenger, userId, passengers } = req.body;

    // validate the request
    if (!sourceStationName || !sourceStationCode || !destinationStationName || !destinationStationCode || !numberOfPassenger || userId === undefined || passengers === undefined || passengers.length <= 0) {
        return res.json({ "status": "error", "message": "Invalid request" });
    }

    const secret = process.env.TICKET_ENCRYPTION_SECRET;

    // create a new ticket with jwt token
    const token = jwt.sign({ sourceStationName, sourceStationCode, destinationStationName, destinationStationCode, numberOfPassenger, userId, passengers, type: "Reserved" }, secret, { expiresIn: '24h' });

    res.json({ "status": "success", "message": "Ticket created successfully", "data": token });
}

export default createReservedTicket;
