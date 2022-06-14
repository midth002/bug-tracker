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
    password: String!
}

type Auth {
    token: ID!
    user: User
}

type Project {
    _id: ID! 
    title: String!
    description: String
    type: String!
    ticketId: [Ticket]
    status: String!
}

type Query {
    allTickets: [Ticket]!
    getOneTicket(_id: ID): Ticket!
    allProjects: [Project]!
    getOneProject(_id: ID): Project!
    allUsers: [User]!
    getOneUser(username: String!): User!
}

type Mutation {
    createUser(username: String!, email: String!, role: String!, password: String!): Auth
    createTicket( submitter: ID!, title: String!, description: String, priority: String!, type: String!): Ticket
    createProject(title: String!, description: String, type: String!): Project
    addTicketToProject(projectId: ID, ticketId: ID): Project
    login(username: String!, password: String!): Auth
}
`

module.exports = typeDefs;