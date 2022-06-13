import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation createUser($username: String!, $email: String!, $role: String!, $password: String!) {
    createUser(username: $username, email: $email, role: $role, password: $password) {
      username
      email
      role
      password
    }
  }
`;