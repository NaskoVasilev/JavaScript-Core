function storeTickets(ticketsData,sortingParameter) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        }
    }

    let tickets=[];
    for (const ticket of ticketsData) {
        let [destination,price,status]=ticket.split('|')
        let newTicket=new Ticket(destination,price,status);
        tickets.push(newTicket)
    }

    switch (sortingParameter){
        case 'destination':
            tickets.sort((a,b)=>{
                return a.destination.localeCompare(b.destination)
            })
            break;
        case 'price':
            tickets.sort((a,b)=>a.price-b.price)
            break;
        case 'status':
            tickets.sort((a,b)=>a.status.localeCompare(b.status))
            break;
    }

    return tickets;
}

let tickets=storeTickets(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'status'
)
for (const ticket of tickets) {
    console.log(ticket)
}