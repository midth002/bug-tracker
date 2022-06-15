import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Stepper from '../../components/stepper/Stepper';
import TicketForm from '../../components/ticketForm/TicketForm';
import './singleticket.scss';


const SingleTicket = () => {
    const params = window.location.href;
    const paramArray = params.split('/');
    const ticketNum = paramArray[5]
   

    return (
        <div className="container">
        <div className='navbar'>
            <Navbar />
        </div>
        <Sidebar />
        <div className="ticket">
            <div className="ticket-header">
                <h4>Ticket # {paramArray[5]}</h4>
            </div>
                <div className='stepper'>
                    <Stepper />
                </div>
                <div className='ticketForm'>
                    <TicketForm ticketId={ticketNum}/>
                </div>
            </div>
        
        </div>
      )
}

export default SingleTicket;