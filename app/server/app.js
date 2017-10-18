'use strict';

// simple express server
var express = require('express');
var app = express();
var cors = require('cors');
var router = express.Router();
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

//app.use(express.static('./app/client/'));
function setupCORS(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key,Authorization');
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
}
app.get('/', function(req, res) {        
    var natural_language_understanding = new NaturalLanguageUnderstandingV1({
      'username': 'e01c6a3d-1965-41fe-b2df-b7430b72d720',
      'password': 'VeZeale8cxBr',
      'version_date': '2017-02-27'
    });
    
    var parameters = {
      'text': 'IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.',
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
    
    
    //res.sendfile('./app/client/index.html');
    //res.sendfile('./app/client/index.html');
});
app.all('/*', setupCORS);

app.listen(5000);