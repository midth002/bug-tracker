import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import ProgressBar from '../../components/progressBar/ProgressBar';
import TicketForm from '../../components/ticketForm/TicketForm';
import Loading from '../../components/loading/Loading';
import CommentForm from '../../components/commentForm/CommentForm'
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ONE_TICKET, QUERY_USER } from '../../utils/queries';
import Box from '@mui/material/Box'
import './singleticket.scss';
import { Container } from '@mui/system';
import Jumbotron from '../../components/jumbotron/Jumbotron';
import Comments from '../../components/comments/Comments';

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
        console.log(ticketData.getOneTicket)
      }

    getTicketInformation();

    const title = ticketData.getOneTicket.title


    return (
        <Box sx={{ display: 'flex', flexGrow: 1, flexwrap: 'wrap'}}>
        <Sidebar />
        <Jumbotron title={title}/>
        <Box 
        className="ticket"
        bgcolor="white"
        sx={{
            boxShadow: 3,
            borderRadius: 2,
            width: '50%',
            mt: 8,
            ml: 20,
        }}
        >
          
                <div className='stepper'>
                    <ProgressBar 
                    status={ticketData.getOneTicket.status}
                    ticketId={ticketData.getOneTicket._id}
                    />
                </div>
                <div className='ticketForm'>
                    <TicketForm 
                    priority={ticketData.getOneTicket.priority} 
                    description={ ticketData.getOneTicket.description}
                    // title={ticketData.getOneTicket.title} 
                    type={ticketData.getOneTicket.type}
                    created={ticketData.getOneTicket.createdAt}
                    submitter={ticketData.getOneTicket.submitter[0].username}
                    ticketId={ticketData.getOneTicket._id}
                    />
                </div>
                
            </Box>

            <Box
            bgcolor="white"
        sx={{
            boxShadow: 3,
            borderRadius: 2,
            width: '35%',
            mt: 8,
            ml: 3,
            mr: 2,
        }}>
            
            <Comments />
            </Box>
        
        </Box>
      )
}

export default SingleTicket;