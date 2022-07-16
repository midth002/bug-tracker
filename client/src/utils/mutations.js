import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $role: String!, $password: String!) {
  createUser(username: $username, email: $email, role: $role, password: $password) {
    user {
      _id
      username
      email
      role
      password
    }
  }
}
`;

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
mutation Mutation($submitter: ID!, $title: String!, $priority: String!, $type: String!, $description: String) {
  createTicket(submitter: $submitter, title: $title, priority: $priority, type: $type, description: $description) {
    status
    type
    submitter {
      _id
    }
    description
    title
    _id
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