const router = require('express').Router(); 
const {
    createTicket,
    getTickets
} = require('../../controllers/ticketController');

router.route('/').get(getTickets);

router.route('/:userId').post(createTicket);

module.exports = router;