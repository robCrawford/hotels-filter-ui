
var dao = require("../../dao.js");


describe("dao tests", function(){

    it("Should get hotel by id", function(done){

        var hotelId = 374317;

        spyOn(dao, "getById").andCallThrough();

        dao.getById(
            //Mock req
            {
                params: {id: hotelId}
            },
            //Mock res
            {
                header: function() {
                    return {
                        json: function(data){
                            expect(data.EstablishmentId).toBe(hotelId);
                            done();
                        }
                    }
                }
            }
        );

    });

});
