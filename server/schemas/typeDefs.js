const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Ticket {
    _id: ID!
    title: String
    description: String
    submitter: [User]
    priority: String
    type: String
    status: String
    createdAt: String
    assignedTo: [User]
}

type Comment {
    commentId: ID!
    comment: String!
    createdAt: String
    createdBy: User!
    commentOn: Ticket!
}

type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
    password: String!
    firstName: String
    lastName: String
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
    members: [User]
    status: String!
    createdAt: String
}

input MemberInput {
    _id: ID
}

input assignMember {
    _id: ID
}

type Query {
    allTickets: [Ticket]!
    getOneTicket(ticketId: ID): Ticket!
    allProjects: [Project]!
    getOneProject(projectId: ID): Project!
    allUsers: [User]!
    getOneUser(userId: ID): User!
    getTicketByType(type: String!): [Ticket]
    getOneUserByUsername(username: String!): [User]
}

type Mutation {
    createUser(username: String!, email: String!, role: String!, password: String!, firstName: String, lastName: String): Auth
    createTicket(title: String, description: String, priority: String, type: String, submitter: ID, assignedTo: [assignMember]): Ticket
    createProject(title: String!, description: String, type: String!, members: [MemberInput]): Project
    addTicketToProject(projectId: ID, ticketId: ID): Project
    addMemberToProject(projectId: ID, members: [MemberInput]): Project
    login(username: String!, password: String!): Auth
    updateStatus(_id: ID!, status: String!): Ticket
    updateTicketChanges(_id: ID!, priority: String, description: String, type: String): Ticket
    addTicketComment(ticketId: ID, comment: String): Ticket
    assignTicket(ticketId: ID, assignedTo: ID): Ticket
}
`

module.exports = typeDefs;