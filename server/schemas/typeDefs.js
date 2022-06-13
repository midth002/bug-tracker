const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Ticket {
    _id: ID!
    title: String!
    description: String
    submitter: [User]
    priority: String!
    type: String!
    isOpen: Boolean
}

type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
}

type Project {
    _id: ID! 
    title: String!
    description: String
    type: String!
    ticketId: [Ticket]
}

type Query {
    allTickets: [Ticket]!
    getOneTicket(_id: ID): Ticket!
    allProjects: [Project]!
    getOneProject(_id: ID): Project!
    allUsers: [User]!
    getOneUser(_id: ID): User!
}

type Mutation {
    createUser(userId: ID, username: String!, email: String!, role: String!): User
    createTicket( submitter: ID!, title: String!, description: String, priority: String!, type: String!): Ticket
    createProject(projectId: ID, title: String!, description: String, type: String!): Project
    addTicketToProject(projectId: ID, ticketId: ID): Project
}
`

module.exports = typeDefs;