
import Dashboard from './pages/dashboard/Dashboard';
import Signup from './pages/signup/Signup';
import './App.scss';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Projects from './pages/projects/Projects';
import SingleProjects from './pages/projects/SingleProject'
import Login from './pages/login/Login';
import Tickets from './pages/tickets/Tickets';
import SingleTicket from './pages/tickets/SingleTicket';
import LandingPage from './pages/landing/Landing';
import ProjectView from './pages/projectView/ProjectView';
import Settings from './pages/settings/Settings';
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
 link: authLink.concat(httpLink),
 cache: new InMemoryCache(), 
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
    <Routes> 
      <Route path='/' element={<LandingPage />} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/projects' element={<ProjectView />} />
      <Route path='/projects/:projectId' element={<SingleProjects />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/tickets' element={<Tickets />} />
      <Route path='/tickets/:ticketId' element={<SingleTicket />} />
      <Route path='/settings' element={<Settings />}/>
    </Routes>
    </Router>

    </ApolloProvider>
 
  );
}

export default App;
