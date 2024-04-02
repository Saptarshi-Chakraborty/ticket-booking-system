import CONSTANTS from "../../CONSTANTS";

function addNewTicket(ticketObject) {
    const localStorageKey = CONSTANTS.ALL_TICKETS_KEY

    let ticketsJson = localStorage.getItem(localStorageKey) || "[]";
    const ticketsArr = JSON.parse(ticketsJson);
    ticketsArr.push(ticketObject);
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