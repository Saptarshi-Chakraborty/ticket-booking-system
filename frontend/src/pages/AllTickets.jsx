"use client";

import React from 'react'
import Navbar from '../components/Navbar';
import { getAllTickets } from '../utils/localstorage';
import RegularTicketAccordionItem from './TicketAccordionItem';

const AllTickets = () => {

  const allTickets = getAllTickets();

  console.log(allTickets)

  return (
    <>
      <Navbar />
      <main className='container my-3'>
        <h1>Your Tickets</h1>

        <div className="accordion" id="accordionExample">
          {
            (allTickets != undefined) &&
            allTickets.map((item, index) => {
              return <RegularTicketAccordionItem key={index} ticketData={item} index={index} />
            })
          }
        </div>

      </main>
    </>
  )
}

export default AllTickets