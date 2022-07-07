const { Project, Ticket, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
            return await User.findOne({userId})
        }
    },

    Mutation: {
        createTicket: async(parent, args) => {
            return await Ticket.create(args);
        },
        createUser: async(parent, { username, email, password, role}) => {
            const user = await User.create({username, email, password, role});
            const token = signToken(user)
            return { token, user };
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
        }, 
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new AuthenticationError('No profile with this email found!');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }
            const token = signToken(user);
            return { token, user };
            },
        updateStatus: async (parent, {_id, status}) => {
            return await Ticket.findByIdAndUpdate(
                _id,
                {status: status}, 
                {new: true}
            )
        },
        updateTicketChanges: async (parent,props) => {
            const result = await Ticket.findOneAndUpdate({_id:props._id}, props, {new: true})
            return result
        },
        // addTicketComment: async(parent, {ticketId, userId}) => {
        //    return await Ticket.findOneAndUpdate(
        //         {_id: ticketId},
        //         {$push: }
        //    );

        // }
    }
}

module.exports = resolvers;