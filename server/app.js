var mongoose = require('mongoose');
express = require('express');
cors = require('cors');
morgan = require('morgan');
config = require('./config/database');
routes = require('./routes/routes');
bodyParser = require('body-parser');

var app = express();

/* mongoDB connection */
mongoose.connect(config.database);

mongoose.connection.on('open', function(){
    console.log('Mongo is connected');
});

/* Let Express know './public' is a public directory.*/
app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false, limit: '30mb'}));
app.use(bodyParser.json({limit: '30mb'}));
app.use(routes);

module.exports = app;


