
var util = require("../../util.js");


describe("Util tests", function(){

	var testObs = [{a: 1}, {a: 2}];

    it("Should return correctly filtered objects", function(){

        expect(
        	util.filterObjects(testObs, "a", function(val){
        		return val;
        	})
        ).toEqual(testObs);

        expect(
        	util.filterObjects(testObs, "a", function(val){
        		return val < 2;
        	})
        ).toEqual([testObs[0]]);

        expect(
        	util.filterObjects(testObs, "a", function(val){
        		return val > 1;
        	})
        ).toEqual([testObs[1]]);

    });

});
