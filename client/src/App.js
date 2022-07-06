
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
import Login from './pages/login/Login';
import Tickets from './pages/tickets/Tickets';
import SingleTicket from './pages/tickets/SingleTicket';
import LandingPage from './pages/landing/Landing';

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
      <Route path='/:username' element={<Dashboard />} />
      <Route path='/:username/projects' element={<Projects />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/:username/tickets' element={<Tickets />} />
      <Route path='/:username/tickets/:ticketId' element={<SingleTicket />} />
    </Routes>
    </Router>

    </ApolloProvider>
 
  );
}

export default App;
