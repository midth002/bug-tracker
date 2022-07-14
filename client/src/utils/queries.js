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

export const QUERY_ONE_PROJECT = gql`
query GetOneProject($projectId: ID) {
  getOneProject(projectId: $projectId) {
    _id
    title
    description
    type
    ticketId {
      title
      _id
      description
    }
    members {
      _id
      username
      email
      role
    }
    status
  }
}
`;

export const QUERY_USER = gql`
query GetOneUser($userId: ID) {
  getOneUser(userId: $userId) {
    username
    email
    role
    _id
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
    status
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
      username 
      email 
      role
    }
    priority
    type
    status
    createdAt
  }
}`;

export const GET_TICKET_BY_TYPE = gql`
query GetTicketByType($type: String!) {
  getTicketByType(type: $type) {
    title
    description
    priority
    type
    status
    _id
  }
}`;