import React, {useState} from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { QUERY_TICKETS, QUERY_PROJECTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Loading from '../loading/Loading';

const Chart = () => {

  const { loading: ticketsLoading, data: ticketsData, error: ticketError} = useQuery(QUERY_TICKETS);
  const { loading: projectsLoading, data: projectData, error: projectError} = useQuery(QUERY_PROJECTS);
  
  if (ticketsLoading) return <Loading />;
  if (!ticketsData) return <p>Not Found</p>;
 
      const tickets = ticketsData?.allTickets || [];
      const bug = tickets.filter(ticket => ticket.type === 'bug')
      const story = tickets.filter(ticket => ticket.type === 'story')
      const subtask = tickets.filter(ticket => ticket.type === 'subtask')
      const task = tickets.filter(ticket => ticket.type === 'task')

      const newTicket = tickets.filter(ticket => ticket.status === 'new')
      const working = tickets.filter(ticket => ticket.status === 'Working')
      const requiresHelp = tickets.filter(ticket => ticket.status === 'Needs_Help')
      const resolved = tickets.filter(ticket => ticket.status === 'Resolved')
      const completed = tickets.filter(ticket => ticket.status === 'Closed')

      const highPriority = tickets.filter(ticket => ticket.priority === 'High')
      const medPriority = tickets.filter(ticket => ticket.priority === 'Medium')
      const lowPriority = tickets.filter(ticket => ticket.priority === 'Low')
      
      if (projectsLoading) return <Loading />;
      if (!projectData) return <p>Not found</p>;
      console.log(tickets)
        const projects = projectData?.allProjects || [];
        
   
    


      const priorityData = [
        {name: 'Low', uv: lowPriority.length},
         {name: 'Medium', uv: medPriority.length}, 
         {name: 'High', uv: highPriority.length}]

         const typeData = [
          {name: 'Bug', uv: bug.length},
          {name: 'Story', uv: story.length}, 
          {name: 'Task', uv: task.length},
          {name: 'Subtask', uv: subtask.length},
         ]

         const statusData = [
          {name: 'New', uv: newTicket.length},
          {name: 'Working', uv: working.length}, 
          {name: 'Needs Help', uv: requiresHelp.length},
          {name: 'Resolved', uv: resolved.length},
          {name: 'Closed', uv: completed.length},
         ]





 


  return (
    <Box  sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', width: '100%', mt:5}} >
     <Grid container xs={7} spacing={0}>
       <Grid item xs={11}>
            <Box 
            bgcolor='white'
            sx={{ 
                boxShadow: 3,
                borderRadius: 2, 
                width: '95%',
                display: 'flex',
                m:1
              }}
          >
          <div><h5>Priority</h5></div>
        <BarChart width={500} height={170} data={priorityData}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <Bar dataKey="uv" fill="#8884d8" barSize={50} />
        </BarChart>
          </Box>
       </Grid>
       <Grid item xs={11}>   
          <Box 
            bgcolor='white'
            sx={{ 
                boxShadow: 3,
                borderRadius: 2, 
                width: '95%',
                display: 'flex',
                m:1
              }}
          >
          <div><h5>Type</h5></div>
        <BarChart width={500} height={170} data={typeData}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="uv" fill="#8884d8" barSize={50} />
        </BarChart>
          </Box>
       </Grid>
       
     
   
    
       <Grid item xs={11}>
            <Box 
            bgcolor='white'
            sx={{ 
                boxShadow: 3,
                borderRadius: 2, 
                width: '95%',
                display: 'flex',
                m:1
              }}
          >
          <div><h4>Status</h4></div>
        <BarChart width={500} height={170} data={statusData}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <Bar dataKey="uv" fill="#8884d8" barSize={50} />
        </BarChart>
          </Box>
       </Grid>

       
      </Grid>
    </Box>
    
  )
}

export default Chart