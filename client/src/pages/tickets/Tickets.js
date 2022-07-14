import React, {useState} from 'react';
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import AllTicketTable from '../../components/ticketTable/AllTicketTable';
import Button from '@mui/material/Button';
import TicketModal from '../../components/ticketModal/TicketModal'
import { QUERY_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client'
import Loading from '../../components/loading/Loading'
import Jumbotron from '../../components/jumbotron/Jumbotron'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Auth from '../../utils/auth';
import { Container } from '@mui/system';

const Tickets = () => {

  const title = 'TICKETS'

  const params = window.location.href;
  const paramArray = params.split('/');
  const user = paramArray[3]

  const { loading: userNameLoading, data: userNameData, error } 
  = useQuery(QUERY_USER, 
     { variables: {
        userId: user
      }
  })

  if (userNameLoading) return <Loading />;
  if (!userNameData) return <p>User Name Not Found</p>

  // console.log(userNameData.getOneUser._id);

  return (

<div>
{Auth.loggedIn() ? (
  <Box sx={{ display: 'flex', flexGrow: 1, flexwrap: 'wrap', justifyContent: 'center'}}>
      <Sidebar />
      <Jumbotron title={title} />
              <AllTicketTable user={user}/>

  </Box>
) : (
  <Link to="/login">You are not logged in.</Link>
)
}

</div>
  )
}

export default Tickets;