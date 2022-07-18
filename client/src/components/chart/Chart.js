import React, {useState} from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Sector} from 'recharts';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { QUERY_TICKETS, QUERY_PROJECTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Loading from '../loading/Loading';

const Chart = () => {

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

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
        const projects = projectData?.allProjects || [];
        
  
      const priorityData = [
        {name: 'Low', value: lowPriority.length, fill: '#0088FE'},
         {name: 'Medium', value: medPriority.length, fill: '#00C49F'}, 
         {name: 'High', value: highPriority.length, fill: '#FFBB28'}]

         const typeData = [
          {name: 'Bug', value: bug.length, fill: '#003f5c'},
          {name: 'Story', value: story.length, fill: '#7a5195'}, 
          {name: 'Task', value: task.length, fill: '#ef5675'},
          {name: 'Subtask', value: subtask.length, fill: '#ffa600'},
         ]

         const statusData = [
          {name: 'New', value: newTicket.length, fill: '#488f31'},
          {name: 'Working', value: working.length, fill: '#8cbcac'}, 
          {name: 'Needs Help', value: requiresHelp.length, fill: '#de425b'},
          {name: 'Resolved', value: resolved.length, fill: '#ec9c9d' }
         ]


         const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};



 


  return (
    <Box  sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', width: '95%', mt:2}} >
      
     <Grid container  spacing={0}>
       <Grid item xs={4} align='center' justify='center'>
            <Box 
            bgcolor='white'
            sx={{ 
                boxShadow: 3,
                borderRadius: 2, 
                width: '97%',
                display: 'flex',
                m:1
              }}
          >
         
        
     
      
       <PieChart width={350} height={200}>
       <Legend layout="horizontal" verticalAlign="top" align="top" />
  <Pie 
    data={priorityData} 
    dataKey="value" 
    nameKey="name" 
    cx="50%" 
    cy="50%" 
    outerRadius={70} 
    labelLine={false}
    label={renderCustomizedLabel}
    />
</PieChart>

          </Box>
       </Grid>
       <Grid item xs={4}>   
          <Box 
            bgcolor='white'
            sx={{ 
                boxShadow: 3,
                borderRadius: 2, 
                width: '97%',
                display: 'flex',
                m:1
              }}
          >
          {/* <div><h4>Tickets By Type</h4></div> */}
      

        <PieChart width={350} height={200}>
       <Legend layout="horizontal" verticalAlign="top" align="center" />
  <Pie 
    data={typeData} 
    dataKey="value" 
    nameKey="name" 
    cx="50%" 
    cy="50%" 
    outerRadius={70} 
    labelLine={false}
    label={renderCustomizedLabel}
    />
</PieChart>
          </Box>
       </Grid>
       
     
   
    
       <Grid item xs={4}>
            <Box 
            bgcolor='white'
            sx={{ 
                boxShadow: 3,
                borderRadius: 2, 
                width: '97%',
                display: 'flex',
                m:1
              }}
          >
          
          {/* <div><h4>Tickets By Status</h4></div> */}

        <PieChart width={350} height={200} >
       <Legend layout="horizontal" verticalAlign="top" align="top" />
  <Pie 
    data={statusData} 
    dataKey="value" 
    nameKey="name" 
    cx="50%" 
    cy="50%" 
    outerRadius={70} 
    labelLine={false}
    label={renderCustomizedLabel}
    />
</PieChart>
          </Box>
       </Grid>


              
    
       
      </Grid>
     
    </Box>
    
  )
}

export default Chart