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