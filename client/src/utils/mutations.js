import { gql } from '@apollo/client';

export const ADD_USER = gql`
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