const { Schema, model } = require('mongoose');

const projectSchema = new Schema (
    {
        title: {
            type: String, 
            required: true, 
            trim: true,
            minlength: 1,
            maxLength: 100
        }, 
        description: {
            type: String, 
            maxLength: 500
        }, 
        type: {
            type: String,
            required: true
        },
        tickets : [
            {
                type: Schema.Types.ObjectId,
                ref: 'ticket',
            },
        ],
    }, 
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
); 

const Project = model('project', projectSchema);

module.exports = Project; 