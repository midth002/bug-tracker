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
    },
    getUser(req, res) {
        User.findOne({ _id: req.params.id })
        .then((dbUser) => 
        !dbUser
            ? res.status(404).json({ message: 'No user found with this id! '})
            : res.json(dbUser)
        )
        .catch((err) => res.json(err)); 
    }
}