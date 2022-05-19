const Ticket = require('../models/Ticket');
const User = require('../models/User');

module.exports = {
    createThought(req, res) {
        Ticket.create(req.body)
        .then((ticket) => {
            return User.findOneAndUpdate(
                { _id: req.params.userId},
                { $addToSet: { tickets: ticket._id}},
                { new: true }
            );
        })
        .then((ticket) => 
        !ticket
            ? res.status(404).json({ message: 'No user with this id. Cannot create ticket.'})
            : res.json(ticket)
        )
        .catch((err) => {
            return res.status(500).json(err)
        })
    }
}