var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
    input: {
        type: Array,
        required: true
    },
    output: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Data', dataSchema);