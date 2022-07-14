const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
        },
        password : {
            type: String,
            required: true,
            minlength: 8
        },

        role: {
            type: String, 
            required: true
        }
        
    }, 
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('userCount').get(function() {
    return this.length
})



const User = model('user', userSchema);

module.exports = User;