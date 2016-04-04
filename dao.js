/*
  Data access
*/
var util = require('./util'),
    hotels = require('./data/hotels').Establishments;


module.exports = {

    getById: function(req, res){
    //Get one hotel by id
        var match = util.filterObjects(
                hotels, 'EstablishmentId', function(value){
                    return req.params.id == value; //Loose comparison
                }
            )[0];

        if(match){
            res.header("Access-Control-Allow-Origin", "*")
                .json(match);
        }
        else{
            res.statusCode = 404;
            return res.send('Error 404');
        }
    },

    getByQuery: function(req, res){
    //Process query string params for filter and sort
        var qs = require('url').parse(req.url, true).query,
            qsFields = {
                //Querystring field : JSON field
                distance: 'Distance',
                name: 'Name',
                stars: 'Stars',
                rating: 'UserRating',
                price: 'MinCost'
            };

        //Querystring for sort
        //i.e. sort=distance-asc
        var sortFieldParts = qs.sort && qs.sort.split("-"),
            sortField = sortFieldParts && sortFieldParts[0],
            jsonParam = sortField && qsFields[sortField];

        if(jsonParam){
            var isAsc = sortFieldParts[1] === "asc";

            //Ascending
            if(isAsc){
                hotels.sort(
                    util.getComparisonFn(jsonParam, true)
                );
            }
            //Descending
            else {
                hotels.sort(
                    util.getComparisonFn(jsonParam, false)
                );
            }
        }

        //Querystring for filters
        //i.e. stars=3
        var matches = hotels;

        Object.keys(qsFields).forEach(function(qsParam){
            var qsValue = qs[qsParam],
                jsonParam = qsFields[qsParam];

            if(qsValue && jsonParam){
                matches = util.filterObjects(matches, jsonParam, function(value){
                    //Min price
                    if(jsonParam === 'MinCost'){
                        return value >= qsValue;
                    }
                    //Numbers
                    else if(jsonParam === 'Stars' || jsonParam === 'UserRating' || jsonParam === 'Distance'){
                        return parseInt(value) === parseInt(qsValue);
                    }
                    //Strings - look for match anywhere in string
                    else return new RegExp(qsValue, 'i').test(value);
                });
            }
        });

        //Show first 9 results
        res.header("Access-Control-Allow-Origin", "*")
            .json(matches && matches.slice(0,9));
    },

    getPromo: function(req, res){
    //Get one hotel for promotion
        res.header("Access-Control-Allow-Origin", "*")
            .json(hotels[
                (Math.random() * hotels.length)|0
            ]);
    }

}
