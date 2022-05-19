const User = require('../models/User');

module.exports = {
    createUser(req, res){
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    }, 
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    }
}