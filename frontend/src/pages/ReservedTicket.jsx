"use client";

import React, { createRef, useRef, useState } from 'react'
import Navbar from '../components/Navbar'

const ReservedTicket = () => {
    const [ticketDetails, setTicketDetails] = useState({ ticketId: null, destination: null, source: null, ticketData: null, encryptedTicketData: null, noOfPassenger: 1 });

    // Refs
    const destinationInputRef = useRef(null);

    const [allStations, setAllStations] = useState([]);

    const handleChange = (e) => {
        console.log(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }


    return (
        <>
            <Navbar />

            <div className="container my-3">
                <h1>Book Reserved Tickets</h1>

                <div>
                    
                </div>

            </div>
        </>
    )
}

export default ReservedTicket