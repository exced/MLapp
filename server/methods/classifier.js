var Data = require('../models/data');
var config = require('../config/database');
var Q = require('q')
var mongoose = require('mongoose');
var synaptic = require('synaptic');
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

/* Hyper parameters */
var network;
var learningRate = 0.01;
var epochs = 10;

var classes = [
    'Bluejay',
    'Chickadee',
    'Robin'
];

/**
* Retrieves desired output vector from class name
*/
function outputVectorFromClass(className) {
    return classes.map((className_) => (className_ == className) ? 1 : 0);
}

function initNetwork() {
    var inputLayer = new Layer(3);
    var hiddenLayer1 = new Layer(5);
    var outputLayer = new Layer(3);
    inputLayer.project(hiddenLayer1);
    hiddenLayer1.project(outputLayer);
    network = new synaptic.Network({
        input: inputLayer,
        hidden: [hiddenLayer1],
        output: outputLayer
    });
}
initNetwork();

function processInput(input) {
    for (var i = 0; i < input.length; i++) {
        input[i] = +input[i];
    }
    return input;
}

var functions = {

    /**
     * Create a new data
     */
    onCreate: function (req, res) {

        // data sanifying + preprocessing
        var input = processInput(req.body.input.split(","));

        /* save locally */
        var data = Data({
            input: input,
            output: req.body.output
        });
        data.save(function (errSave, newSaved) {
            if (errSave) {
                console.error('Failed to save data: ' + errSave);
                return res.json({ success: false, msg: 'Failed to save' });
            } else {
                return res.json({ success: true, msg: 'Successfully saved' });
            }
        })
    },

    /**
     * Get data infos : quantity
     */
    onGet: function (req, res) {
        let className = String(req.params.className);
        var queries = [
            Data.count(Data.count({ output: className }).exec()),
            Data.count(Data.count({}).exec())
        ];
        Q.all(queries).then(function (datas) {
            return res.json({ success: true, msg: 'Get information complete', data: datas });
        });
    },

    /**
     * Get data infos : quantity
     */
    onGetAll: function (req, res) {
        var queries = [];
        classes.map((className) => {
            queries.push(Data.count({ output: className }).exec());
        });
        Q.all(queries).then(function (datas) {
            return res.json({ success: true, msg: 'Get information complete', data: datas });
        });
    },

    /**
     * Predict the class of the given data
     */
    onPredict: function (req, res) {

        // data sanifying + preprocessing
        var input = processInput(req.body.input.split(","));

        return res.json({ success: true, msg: 'Prediction complete', data: network.activate(input) });
    },

    /**
     * Training process
     */
    onTrain: function (req, res) {

        /* find all */
        Data.find({}, function (err, datas) {
            if (!err) {
                for (var i = 0; i < epochs; i++) {
                    for (var j = 0; j < datas.length; j++) {
                        network.activate(datas[j].input);
                        network.propagate(learningRate, outputVectorFromClass(datas[j].output));
                    }
                }
                return res.json({ success: true, msg: 'Training complete' });
            }
            else {
                return res.json({ success: false, msg: 'No data found' });
            }
        });
    }

}

module.exports = functions;