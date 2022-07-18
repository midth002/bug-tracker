import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation Mutation($username: String!, $email: String!, $role: String!, $password: String!, $firstName: String, $lastName: String) {
  createUser(username: $username, email: $email, role: $role, password: $password, firstName: $firstName, lastName: $lastName) {
    user {
      username
      firstName
      lastName
    }
  }
}`;

export const LOGIN_USER = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
  token
  user {
      _id
      username
  }
  }
}
`;

export const UPDATE_STATUS = gql`
mutation UpdateStatus($id: ID!, $status: String!) {
  updateStatus(_id: $id, status: $status) {
    _id
    title
    status
  }
}`;

export const CREATE_TICKET = gql`
mutation CreateTicket($title: String, $description: String, $priority: String, $type: String, $submitter: ID, $assignedTo: [assignMember]) {
  createTicket(title: $title, description: $description, priority: $priority, type: $type, submitter: $submitter, assignedTo: $assignedTo) {
    _id
    title
    description
    submitter {
      _id
    }
    priority
    type
    assignedTo {
      _id
    }
  }
}`;

export const SAVE_TICKET_CHANGES = gql`
mutation Mutation($id: ID!, $priority: String, $description: String, $type: String) {
  updateTicketChanges(_id: $id, priority: $priority, description: $description, type: $type) {
    _id
    title
    description
    priority
    type
    status
  }
}`;

export const CREATE_PROJECT = gql`
mutation CreateProject($title: String!, $type: String!, $members: [MemberInput], $description: String) {
  createProject(title: $title, type: $type, members: $members, description: $description) {
    _id
    title
    type
    members {
      _id
    }
    description
  }
}`;

export const ADD_TICKET_TO_PROJECT = gql`mutation AddTicketToProject($projectId: ID, $ticketId: ID) {
  addTicketToProject(projectId: $projectId, ticketId: $ticketId) {
    _id
    title
    ticketId {
      _id
      title
    }
  }
}`;

export const ADD_MEMBER_TO_PROJECT = gql`
mutation AddMemberToProject($projectId: ID, $members: [MemberInput]) {
  addMemberToProject(projectId: $projectId, members: $members) {
    _id
    title
    members {
      _id
    }
  }
}
`;