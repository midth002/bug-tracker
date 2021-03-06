const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');

const ticketSchema = new Schema (
    {
        title: {
            type: String, 
            // required: true, 
            trim: true,
            minlength: 1, 
            maxlength: 280
        },
        description: {
            type: String, 
            maxlength: 500 
        },
        createdAt: {
            type: Date, 
            default: Date.now,
        }, 
        submitter: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }],
        assignedTo: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }],
        priority: {
            type: String,
            // required: true
        }, 
        type: {
           type: String,
        //    required: true 
        },
        status: {
            type: String,
            required: true,
            default: "new"
        },
        comments: [{
            type: commentSchema}]
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const Ticket = model('ticket', ticketSchema);

module.exports = Ticket;

