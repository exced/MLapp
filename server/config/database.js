var uuid = require('uuid');
module.exports = {
    database: 'mongodb://localhost/AskTia',
    secret: uuid.v4()
};
