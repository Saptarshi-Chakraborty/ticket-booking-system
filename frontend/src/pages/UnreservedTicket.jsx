"use client";

import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import Navbar from '../components/Navbar'
import { ALL_STATIONS } from '../../public/data/allStations'
import TicketCard from '../components/TicketCard';
import { addNewTicket } from '../utils/localstorage';
import CONSTANTS from '../../CONSTANTS';
import NewRegularTicketCard from '../components/NewTicketCard';


const UnreservedTicket = () => {
    // ---- State Variables ---- //
    const [ticket, setTicket] = useState({ source: null, destination: null, ticketData: null, encryptedTicketData: null, noOfPassenger: 1 })
    const [allStations, setAllStations] = useState([])
    const [showTicketCard, setShowTicketCard] = useState(false)

    // Ref variables
    const sourceInputRef = useRef(null)
    const destinationInputRef = useRef(null)



    // ---- Custom Functions ---- //

    function getAllStations() {
        if (allStations.length > 0) return;
        // const URL = `${window.location.protocol}//${window.location.host}/data/ALL_STATIONS.json`
        const URL = `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.getAllStations}`
        console.log(URL)

        fetch(URL).then(res => res.json()).then((_rawData) => {
            const jsonData = JSON.stringify(_rawData)
            const parsedData = JSON.parse(jsonData);

            setAllStations(parsedData.data)

            console.log(parsedData.data)
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


    async function bookTicket() {
        console.log("Booking ticket...")
        if (!ticket.source || !ticket.destination) return;
        console.log(ticket);


        if (ticket.source == ticket.destination) {
            toast.error("Source and Destination stations can't be same")
            return;
        }

        const sourceStation = allStations.filter((item) => (item.code == ticket.source))[0];
        const destinationStation = allStations.filter((item) => (item.code == ticket.destination))[0];

        const ticketData = {
            sourceStationName: sourceStation.name,
            sourceStationCode: sourceStation.code,
            destinationStationName: destinationStation.name,
            destinationStationCode: destinationStation.code,
            numberOfPassenger: ticket.noOfPassenger,
            userId: null,
        };


        const API = `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.createRegularTicket}`;
        const params = { body: JSON.stringify(ticketData), method: 'POST', headers: { 'Content-Type': 'application/json' } };

        try {
            const response = await fetch(API, params).then(res => res.json())

            if (response.status == "error") {
                toast.error(response.msg)
                return;
            }

            toast.success("Ticket Booked Successfully")
            console.log(response);

            setTicket((oldData) => {
                return {
                    ...oldData,
                    ticketData: ticketData,
                    encryptedTicketData: response.data
                }
            });

            addNewTicket(response.data);

            resetFields();
        } catch (error) {
            console.error(error)
            toast.error("Failed to book ticket")
        }

    }

    function resetFields() {
        sourceInputRef.current.value = null
        destinationInputRef.current.value = null;
        setTicket((oldValues) => {
            return {
                ...oldValues,
                noOfPassenger: 1
            }
        })
    }


    // ---- Hoocks ---- ///


    useEffect(() => {
        // setAllStations(ALL_STATIONS)
        getAllStations();
    }, []);




    return (
        <>
            <ToastContainer position='top-left' theme="dark" />

            <Navbar />
            <div className='container my-3'>
                <h1>Book Regular Tickets</h1>

                <div className='my-3'>
                    {/* Source Stations Dropdown */}
                    <div className="mb-3">
                        <label className="form-label fs-5" htmlFor="sourceInput">Source Station</label>
                        <select ref={sourceInputRef} onChange={changeStation} name="source" className="form-select" defaultValue={null} id="sourceInput">
                            {
                                (allStations.length <= 0) ?
                                    <option disabled>No Station Found</option>
                                    :
                                    <option value={null} selected disabled>Select Station</option>
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
                        <select ref={destinationInputRef} onChange={changeStation} name="destination" className="form-select" id="destInput">
                            {
                                (allStations.length <= 0) ?
                                    <option value={null} disabled>No Station Found</option>
                                    :
                                    <option value={null} selected disabled>Select Station</option>
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

                <hr />

                {
                    (ticket.encryptedTicketData) &&
                    <NewRegularTicketCard
                        ticketData={ticket.encryptedTicketData}
                        key={ticket.encryptedTicketData}
                    />
                }

            </div>
        </>
    )
}

export default UnreservedTicket