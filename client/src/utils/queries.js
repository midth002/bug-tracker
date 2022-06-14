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