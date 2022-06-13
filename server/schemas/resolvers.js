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
        createTicket: async(parent, args, context) => {
            if (context.user) {
                const ticket = new Ticket({ args });
               await User.findByIdAndUpdate(context.user._id, args, { new: true})
               return ticket;
            }
        },
        createUser: async(parent, args) => {
            const user = await User.create(args);
            return { user };
        }
    }
}

module.exports = resolvers;