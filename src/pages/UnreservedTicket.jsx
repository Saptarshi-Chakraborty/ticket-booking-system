"use client";

import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { ALL_STATIONS } from '../../public/data/allStations'
import TicketCard from '../components/TicketCard';
import QRCode from 'qrcode'


const UnreservedTicket = () => {
    // ---- State Variables ---- //
    const [ticket, setTicket] = useState({ source: null, destination: null, ticketData: null, encryptedTicketData: null, noOfPassenger: 1 })
    const [allStations, setAllStations] = useState([])


    // ---- Custom Functions ---- //

    function getAllStations() {
        if (allStations.length > 0) return;
        const URL = `${window.location.protocol}//${window.location.host}/data/ALL_STATIONS.json`
        console.log(URL)

        fetch(URL).then(res => res.json()).then((data) => {
            const jsonData = JSON.stringify(data)
            const parsedData = JSON.parse(jsonData);

            setAllStations(data)

            console.log(jsonData)
        }).then(() => {
            console.log(allStations)
        })
    }

    function changeStation(e) {
        const value = e.target.value;
        const name = e.target.name;

        setTicket((oldData) => {
            return {
                ...oldData,
                [name]: value
            }
        })
    }

    function changePassenger(changeBy) {
        // Number of passenger can't be lower than 1
        if (ticket.noOfPassenger == 1 && changeBy < 1) return;

        // Number of passenger can't be lower than 100
        if (ticket.noOfPassenger == 100 && changeBy > 0) return;


        setTicket((oldData) => {
            return {
                ...oldData,
                "noOfPassenger": (oldData.noOfPassenger + changeBy)
            }
        })
    }


    function bookTicket() {
        console.log("Booking ticket...")
        if (!ticket.source || !ticket.destination) return;

        console.log(ticket);


        if (ticket.source == ticket.destination) {
            alert("Source and Destination stations can't be same")
            return;
        }

        const sourceStation = allStations.filter((item) => (item.code == ticket.source))[0];
        const destinationStation = allStations.filter((item) => (item.code == ticket.destination))[0];

        const bookingTime = new Date();
        const bookingTimestamp = bookingTime.getTime();

        const expiryTimestamp = bookingTimestamp + (1000 * 60 * 60 * 24) // ms * s * h * x
        const expiryTime = new Date(expiryTimestamp)

        const ticketData = {
            source: sourceStation,
            destination: destinationStation,
            numberOfPassenger: ticket.noOfPassenger,
            bookingTimestamp,
            expiryTimestamp,
            ticketType: "Regular/Unreserved"
        };

        const jsonTicketData = JSON.stringify(ticketData);
        console.log(ticketData)

        setTicket((oldData) => {
            return {
                ...oldData,
                ticketData: ticketData,
                encryptedTicketData: jsonTicketData
            }
        })

    }


    // ---- Hoocks ---- ///


    useEffect(() => {
        setAllStations(ALL_STATIONS)
    }, []);




    return (
        <>
            <Navbar />
            <div className='container my-3'>
                <h1>Book Regular Tickets</h1>

                <div className='my-3'>
                    {/* Source Stations Dropdown */}
                    <div className="mb-3">
                        <label className="form-label fs-5" htmlFor="sourceInput">Source Station</label>
                        <select onChange={changeStation} name="source" className="form-select" id="sourceInput">
                            {
                                (allStations.length <= 0) ?
                                    <option disabled>No Station Found</option>
                                    :
                                    <option selected disabled>Select Station</option>
                            }

                            {
                                allStations.map((item) => {
                                    return <option key={item.code} value={item.code}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>

                    {/* Destination Stations Dropdown */}
                    <div className="mb-3">
                        <label className="form-label fs-5" htmlFor="destInput">Destination Station</label>
                        <select onChange={changeStation} name="destination" className="form-select" id="destInput">
                            {
                                (allStations.length <= 0) ?
                                    <option disabled>No Station Found</option>
                                    :
                                    <option selected disabled>Select Station</option>
                            }

                            {
                                allStations.map((item, index) => {
                                    return <option key={item.code} value={item.code}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>

                    {/* Change Number of Passenger */}
                    <div className="mb-3">
                        <label className='form-label fs-5' htmlFor="numberOfPassengerSelect">Number of Passenger</label>
                        <div className='d-flex gap-3 align-items-center' id='numberOfPassengerSelect'>
                            <button onClick={() => changePassenger(-1)} className='btn btn-danger fw-bold'>-</button>
                            <span className='fs-5 fw-bold'>{ticket.noOfPassenger}</span>
                            <button onClick={() => changePassenger(1)} className='btn btn-primary fw-bold'>+</button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button onClick={bookTicket} className='btn btn-success w-100'>Book Ticket</button>
                </div> { /* Form End */}


                {/* Verbose the ticket State      // DEVELOPMENT  */}
                <div className='d-none'>
                    <h4>Details (verbose)</h4>
                    <p>Source : {ticket.source}</p>
                    <p>Destination : {ticket.destination}</p>
                    <p>Number of Passenger : {ticket.noOfPassenger} </p>
                    <p>Ticket Data : {ticket.encryptedTicketData} </p>
                </div>

                {/* Ticket Qr Code  */}
                {
                    (ticket.encryptedTicketData) &&
                    <TicketCard
                        ticketData={ticket.ticketData}
                        encryptedTIcketData={ticket.encryptedTicketData}
                    />
                }



            </div>
        </>
    )
}

export default UnreservedTicket