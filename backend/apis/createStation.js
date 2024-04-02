import Station from '../model/stations.js';
import mongoose from 'mongoose';
import GLOBALS from '../CONSTANTS.js';

async function addNewStation(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    const body = req.body;
    const { name, code } = body;

    console.log(body);

    if (!name || !code) {
        res.status(400).json({ "status": "error", "msg": "Invalid values in request" });
        return;
    }
    console.log(`Name: ${name}, Code: ${code}`);

    const connection = await mongoose.connect(GLOBALS.mongoURI);

    if (!connection) {
        console.log("MongoDB connection failed");
        res.status(500).json({ "status": "error", "msg": "Internal Server Error" });
    }

    const existingStation = await Station.findOne({ code });

    if (existingStation) {
        console.log(existingStation);
        res.status(400).json({ "status": "error", "msg": "Station code already exists" });
        return;
    }

    const newStation = new Station({ name, code });
    const result = await newStation.save();

    if (!result) {
        res.status(500).json({ "status": "error", "msg": "Internal Server Error" });
    }

    res.json({ "status": "success", "msg": "Station added successfully", name, code });
}

export default addNewStation;