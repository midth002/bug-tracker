const { Project, Ticket, User } = require('../models');

const resolvers = {
    Query: {
        allTickets: async () => {
            return await Ticket.find({});
        }, 
        allProjects: async () => {
            return await Project.find({});
        }, 
        allUsers: async () => {
            return await User.find({});
        }, 
        getOneTicket: async (parent, {ticketId}) => {
            return await Ticket.findOne({_id: ticketId})
        }, 
        getOneProject: async (parent, {projectId}) => {
            return await Project.findOne({_id: projectId})
        },
        getOneUser: async (parent, {userId}) => {
            return await User.findOne({_id: userId})
        }
    },

    Mutation: {
        createTicket: async(parent, args) => {
            return await Ticket.create(args);
        },
        createUser: async(parent, args) => {
            const user = await User.create(args);
            return { user };
        },
        createProject: async(parent, args) => {
            const project = await Project.create(args);
            return project;
        },
        addTicketToProject: async(parent, {projectId, ticketId}) => {
            return await Project.findOneAndUpdate(
                {_id: projectId},
                {$push: {ticketId: ticketId}},
                {new: true}
            ).populate('ticketId')
        }
    }
}

module.exports = resolvers;