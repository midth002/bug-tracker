const { Schema, Types } = require('mongoose');

const commentSchema = new Schema (
    {
        commentId : {
            type: Schema.Types.ObjectId, 
            default : () => new Types.ObjectId(),
        },
        comment: {
            type: String, 
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 450
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

module.exports = commentSchema;