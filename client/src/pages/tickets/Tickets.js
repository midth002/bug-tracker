import React from 'react';
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import AllTicketTable from '../../components/ticketTable/AllTicketTable';



const Tickets = () => {
  return (
    <div className="container">
    <div className='navbar'>
        <Navbar />
    </div>
    <Sidebar />
    <div className="projects">
        <div className="project-header">
        <h4>All Tickets</h4>
            
        </div>
    <AllTicketTable />
    </div>
</div>
  )
}

export default Tickets;