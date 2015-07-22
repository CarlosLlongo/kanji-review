describe('ReviewService', function(){
    var ReviewService;

    beforeEach(module('ui.router'));
    beforeEach(module('kanjireview.review'));

    beforeEach(inject(function(_ReviewService_){
        ReviewService = _ReviewService_;
    }));

    it('can get instance of my service', inject(function(ReviewService){
        expect(ReviewService).toBeDefined();
    }));


});