import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

const SingleTicket = () => {
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

export default SingleTicket