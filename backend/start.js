import express from 'express';
import cors from 'cors';
import addNewStation from './apis/createStation.js';
import getAllStations from './apis/getAllStations.js';
import createRegularTicket from './apis/regularTicket.js';
import 'dotenv/config'
import * as dotenv from 'dotenv';
import verifyTicket from './apis/verifyTicket.js';
import createReservedTicket from './apis/reservedTicket.js';

dotenv.config(); // Load .env file


const app = express()
const port = 3000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json; charset=utf-8");
    res.json({ "Hello": "World!" })
});

// <---- STATIONS ---->
app.post('/add-station', addNewStation);
app.get('/stations', getAllStations);

// <---- TICKETS ---->
app.post('/regular-ticket', createRegularTicket);
app.post('/reserved-ticket', createReservedTicket);
app.post('/verify-ticket', verifyTicket);

app.listen(port, () => {
    console.log(`Backend app running at http://localhost:${port}`)
})