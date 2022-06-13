import { gql } from '@apollo/client';

export const QUERY_PROJECTS = gql`
query allProjects {
  allProjects {
    _id
    title
    ticketId {
      _id
 
    }
    description
    status
  }
}
`;