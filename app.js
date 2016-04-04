
var express = require('express'),
    bodyParser = require('body-parser'),
    dao = require('./dao');

var app = express()
    .use(express.static(__dirname + '/public'))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json());

var listener = app.get('/hotel/promo', dao.getPromo)
	.get('/hotel/:id', dao.getById)
	.get('/hotel/', dao.getByQuery)
	.listen(3000, function(){
            console.log('Listening on port ' + listener.address().port);
        });
