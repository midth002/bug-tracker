import React, {useState} from 'react';
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import AllTicketTable from '../../components/ticketTable/AllTicketTable';
import Button from '@mui/material/Button';
import TicketModal from '../../components/ticketModal/TicketModal'
import { QUERY_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client'
import Loading from '../../components/loading/Loading'


const Tickets = () => {

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
    <div className="container">
    <div className='navbar'>
        <Navbar />
    </div>
    <Sidebar />
    <div className="projects">
        <div className="project-header">
        <h4>All Tickets</h4>
          <TicketModal user={userNameData.getOneUser._id}/>
        </div>
    <AllTicketTable user={user}/>
    
    </div>
</div>
  )
}

export default Tickets;