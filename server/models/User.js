const { Schema, model } = require('mongoose');

const userSchema = new Schema (
    {
        username : {
            type: String, 
            required: true,
            trim: true,
            unique: true
        },
        email : {
            type: String, 
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        }
    }
)