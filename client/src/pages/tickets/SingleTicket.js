import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Stepper from '../../components/stepper/Stepper';
import TicketForm from '../../components/ticketForm/TicketForm';
import Loading from '../../components/loading/Loading';
import { useQuery } from "@apollo/client";
import { QUERY_ONE_TICKET } from '../../utils/queries';
import './singleticket.scss';


const SingleTicket = () => {

    const params = window.location.href;
    const paramArray = params.split('/');
    const ticketNum = paramArray[5]


        const { loading: ticketLoading, data: ticketData, error } = useQuery(QUERY_ONE_TICKET, {
            variables: {
                ticketId: ticketNum}
        })

        if (ticketLoading) return <Loading />;
        if (!ticketData) return <p>Not Found</p>;

      const getTicketInformation = async () => {
        console.log(ticketData.getOneTicket.priority)
      }

    getTicketInformation();


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