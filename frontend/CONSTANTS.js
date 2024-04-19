const CONSTANTS = {
    "JWT_SECRET": "wfr43Ge5$2w*d9",
    "ALL_TICKETS_KEY": "allTickets",
    "AUTH_TOKEN_KEY": "AUTH_TOKEN",
    "addNewStationModalId": "addNewStationModal",
    "API": {
        "BASE_URL": `${window.location.protocol}//${window.location.hostname}:3000`,
        "addNewStation": "/add-station",
        "getAllStations": "/stations",
        "createRegularTicket": "/regular-ticket",
        "createReservedTicket": "/reserved-ticket",
        "verifyTicket": "/verify-ticket",
        "createUser": "/create-user",
        "loginUser": "/login",
        "getUserTickets": "/my-tickets",
    },
    "UnreservedTicketFarePerKm": 0.5,
    "ReservedTicketFarePerKm": 1.5,
}

export default CONSTANTS