import React, {useState} from 'react';
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
import { QUERY_TICKETS, GET_USERNAME} from "../../utils/queries";


const Tickets = () => {

  const [tableData, setTableData] = useState([])

  const title = 'TICKETS'
  const username = Auth.getUsername();
  console.log(username)
  
  const {loading: userLoading, data: userData, error: userError} = useQuery(GET_USERNAME, {
    variables: {
      username: username
    }
  });
  const {loading: ticketsLoading, data: ticketData, error: ticketError} = 
  useQuery(QUERY_TICKETS);

  if(userLoading) return <Loading />

  const user = userData.getOneUserByUsername[0]._id



  

    if (ticketsLoading) return <Loading />;
    if (!ticketData) return <p>Not Found</p>;
  
  const getTickets = async () => {
    const tickets = await ticketData?.allTickets || [];
    setTableData(tickets);
}

  getTickets();
 
  return (

<div>
{Auth.loggedIn() ? (
  <Box sx={{ display: 'flex', flexGrow: 1, flexwrap: 'wrap', justifyContent: 'center'}}>
      <Sidebar />
      <Jumbotron title={title} />
              <Box sx={{width: '80%', ml: 15, mt: 10}}>
                  <AllTicketTable ticket={tableData} user={user}/>
              </Box>

  </Box>
) : (
  <Link to="/login">You are not logged in.</Link>
)
}

</div>
  )
}

export default Tickets;