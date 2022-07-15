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
        getTicketByType: async (parent, {type}) => {
          return await Ticket.find({type: type})
        },
        getOneTicket: async (parent, {ticketId}) => {
            return await Ticket.findOne({_id: ticketId}).populate(["submitter"])
        }, 
        getOneProject: async (parent, {projectId}) => {
            return await Project.findOne({_id: projectId}).populate(["ticketId", "members"])
        },
        getOneUser: async (parent, {userId}) => {
            return await User.findOne({userId})
        },
        getOneUserByUsername: async (parent, {username}) => {
            return await User.find({username})
        },
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
        addMemberToProject: async(parent, {projectId, members}) => {
            return await Project.findOneAndUpdate(
                {_id: projectId}, 
                {$push: {members: members}},
                {new: true}
            ).populate('members')
        },
        assignTicket: async(parent, {ticketId, assignedTo}) => {
            return await Ticket.findOneAndUpdate(
                {_id: ticketId}, 
                {$push: {assignedTo: assignedTo}},
                {new: true}
            ).populate('assignedTo')
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
        addTicketComment: async(parent, {ticketId, comment}) => {
           return await Ticket.findOneAndUpdate(
                {_id: ticketId},
                {$push: {comments: comment}},
                {new: true}
           );

        }
    }
}

module.exports = resolvers;