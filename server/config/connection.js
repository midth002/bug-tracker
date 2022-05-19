const { connect, connection } = require('mongoose');

connect('mongodb://localhost/bug-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
