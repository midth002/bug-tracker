import { gql } from '@apollo/client';

export const QUERY_PROJECTS = gql`
query allProjects {
  allProjects {
    _id
    title
    description
    status
  }
}
`;

export const QUERY_USERNAME = gql`
query getOneUser($username: String!) {
  getOneUser(username: $username) {
    username
  }
}
`;

export const QUERY_TICKETS = gql`
query allTickets{
  allTickets {
    _id
    title
    description
    priority
    type
    isOpen
  }
}
`;

export const QUERY_ONE_TICKET = gql`
query GetOneTicket($ticketId: ID) {
  getOneTicket(ticketId: $ticketId) {
    _id
    title
    description
    submitter {
      _id
    }
    priority
    type
    isOpen
  }
}`