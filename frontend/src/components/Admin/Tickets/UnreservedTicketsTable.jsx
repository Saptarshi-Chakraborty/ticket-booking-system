import React, { useLayoutEffect } from 'react'
import DataTable from 'datatables.net-bs5';
import 'datatables.net-fixedheader-bs5';
import '../../../styles/DataTable.css'

const UnreservedTicketsTable = ({ unreservedTickets }) => {

    useLayoutEffect(() => {
        let table = new DataTable('#unreservedTicketTable', {
            fixedHeader: true,
            responsive: true,
            autoWidth: true,
            paging: true,
            orderMulti: true,
            columnDefs: [
                { orderable: false, targets: [6, 4] }
            ],
        });

        return () => {
            table.destroy();
        }
    }, [])


    return (
        <>
            <section className="d-flex flex-column justify-content-between align-items-center mt-2 w-100">
                <h3>Unreserved Tickets</h3>

                <table id="unreservedTicketTable" className="table table-striped table-bordered w-100" style={{ "width": "100%" }}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Booked By</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Passengers</th>
                            <th scope="col">Fare</th>
                            <th scope="col">Status</th>
                            <th scope="col">Booked At</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            unreservedTickets.map((ticket, index) => {
                                console.log(ticket);
                                // calculate if the ticket has been expired
                                const expiryDate = new Date(ticket?.expiresAt);
                                const currentDate = new Date();
                                const isExpired = expiryDate < currentDate;
                                const status = isExpired ? "Expired" : "Active";
                                const statusColor = isExpired ? "danger" : "success";
                                const lastEditedAt = new Date(ticket?.issuedAt).toLocaleString();

                                return <tr key={ticket?._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{ticket?.userId}</td>
                                    <td>{ticket?.sourceStation?.name} ({ticket?.sourceStation?.code})</td>
                                    <td>{ticket?.destinationStation?.name} ({ticket?.destinationStation?.code})</td>
                                    <td>{ticket?.numberOfPassengers}</td>
                                    <td>{ticket?.fare} Rs.</td>
                                    <td>
                                        <span className={`badge bg-${statusColor}`}>{status}</span>
                                    </td>
                                    <td>{lastEditedAt}</td>

                                </tr>
                            })
                        }
                    </tbody>
                </table>

            </section>

        </>
    )
}

export default UnreservedTicketsTable