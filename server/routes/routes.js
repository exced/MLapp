var express = require('express');
var classifier = require('../methods/classifier');

/* RESTFUL routing */
var router = express.Router();

router.get('/train', classifier.onTrain);
router.get('/data/:className', classifier.onGet);
router.get('/data/', classifier.onGetAll);

router.post('/predict', classifier.onPredict);
router.post('/data', classifier.onCreate);

module.exports = router;