import React, { useEffect, useState } from 'react'
import CONSTANTS from '../../../../CONSTANTS.js'
import { getAuthToken } from "../../../utils/localstorage.js"
import { toast } from 'react-toastify';

const TicketAnalytics = ({ reservedTickets, unreservedTickets }) => {
  const [totalReservedTicketFare, setTotalReservedTicketFare] = useState(0)
  const [totalUnreservedTicketFare, setTotalUnreservedTicketFare] = useState(0)

  useEffect(() => {
    // Calculate total fare of reserved tickets
    let totalReservedFare = 0
    reservedTickets.forEach(ticket => {
      totalReservedFare += ticket.fare
    })
    setTotalReservedTicketFare(totalReservedFare)

    // Calculate total fare of unreserved tickets
    let totalUnreservedFare = 0
    unreservedTickets.forEach(ticket => {
      totalUnreservedFare += ticket.fare
    })
    setTotalUnreservedTicketFare(totalUnreservedFare)
  }, [reservedTickets, unreservedTickets])

  return (
    <>
      {/* Create a Card Element to show number of */}
      <div className="card my-3">
        <div className="card-header">
          <h4 className="card-title">Ticket Analytics</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Reserved Tickets</h4>
                </div>
                <div className="card-body">
                  <p>Total Reserved Tickets: <b>{reservedTickets.length}</b></p>
                  <p>Total Amount: <b>{totalReservedTicketFare} Rs.</b></p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Unreserved Tickets</h4>
                </div>
                <div className="card-body">
                  <p>Total Unreserved Tickets: <b>{unreservedTickets.length}</b></p>
                  <p>Total Amount: <b>{totalUnreservedTicketFare} Rs.</b></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default TicketAnalytics