import React from 'react'

const AllStationsTable = ({ allStations }) => {
    return (
        <section className="d-flex flex-column justify-content-between align-items-center mt-2">
            <h3>All stations</h3>

            <table className="table table-secondary table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Station Code</th>
                        <th scope="col">Status</th>
                        <th scope="col">Last Updated At</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allStations.map((station, index) => {
                            const status = station.isActive === true ? "Active" : "Inactive";
                            const statusColor = station.isActive === true ? "success" : "danger";
                            const lastEditedAt = new Date(station.lastEditedAt).toLocaleString();

                            return <tr key={station.code}>
                                <th scope="row">{index + 1}</th>
                                <td>{station.name}</td>
                                <td>{station.code}</td>
                                <td>
                                    <span className={`badge bg-${statusColor}`}>{status}</span>
                                </td>
                                {/* <td>{station.lastEditedAt}</td> */}
                                <td>{lastEditedAt}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning me-2">Edit</button>
                                    <button className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </section>
    )
}

export default AllStationsTable