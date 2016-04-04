
describe("Hotel query tests", function(){

    it("Should sync hotels", function(done){

    	spyOn(hotelsPresenter, "render").and.callFake(function(data){
    		expect(data.length).toBeGreaterThan(0);
    		done();
    	});

    	hotelsPresenter.sync('http://localhost:3000/hotel?rating=10');

    });

});
