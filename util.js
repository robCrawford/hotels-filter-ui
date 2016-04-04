/*
  Utils
*/
module.exports = {

    getComparisonFn: function(jsonParam, isAscending){
    //Returns a comparison function for JSON field sorting
        if(isAscending){
            return function compare(a, b) {
                if(a[jsonParam] < b[jsonParam])return -1;
                if(a[jsonParam] > b[jsonParam])return 1;
                return 0;
            }
        }
        else {
            return function compare(a, b) {
                if(a[jsonParam] < b[jsonParam])return 1;
                if(a[jsonParam] > b[jsonParam])return -1;
                return 0;
            }
        }
    },

    filterObjects: function(obsArray, field, testFn){
    //Returns an array of filtered objects
    //Object is added if `testFn` returns a truthy value
        var matches = [];

        obsArray.forEach(function(o){
            if(testFn(o[field])){
                matches.push(o);
            }
        });

        return matches;
    }

}
