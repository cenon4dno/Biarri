'use strict';

// simple express server
var express = require('express');
var app = express();
var cors = require('cors');
var router = express.Router();
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var henryJson = require('./henry_iv.json');
var bodyParser = require('body-parser');
var config = {
    'username': 'e01c6a3d-1965-41fe-b2df-b7430b72d720',
    'password': 'VeZeale8cxBr',
    'version_date': '2017-02-27'
};

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('./app/client/'));

app.post('/emotion', function(req, res) {      
    var natural_language_understanding = new NaturalLanguageUnderstandingV1(config);    
    var parameters = {
      'text': req.body.text_entry,
      'features': {
        'entities': {
          'emotion': true,
          'sentiment': true,
          'limit': 2
        },
        'keywords': {
          'emotion': true,
          'sentiment': true,
          'limit': 2
        }
      }
    }

    natural_language_understanding.analyze(parameters, function(err, response) {
        if (err)
          console.log('error:', err);
        else
          console.log(JSON.stringify(response, null, 2));
          res.send(response)
      });
});

app.get('/henry', function(req, res) {      
    res.send(henryJson);
});

app.listen(5000);