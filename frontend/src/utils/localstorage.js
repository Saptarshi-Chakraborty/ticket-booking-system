import CONSTANTS from "../../CONSTANTS";

function addNewTicket(ticketData) {
    const localStorageKey = CONSTANTS.ALL_TICKETS_KEY

    let ticketsJson = localStorage.getItem(localStorageKey) || "[]";
    const ticketsArr = JSON.parse(ticketsJson);
    ticketsArr.push(ticketData);
    localStorage.setItem(localStorageKey, JSON.stringify(ticketsArr));
}

function getAllTickets() {
    const localStorageKey = CONSTANTS.ALL_TICKETS_KEY

    let ticketsArr = localStorage.getItem(localStorageKey) || [];
    if (ticketsArr.length > 0) {
        return JSON.parse(ticketsArr);
    }
    return [];
}

export { addNewTicket, getAllTickets }