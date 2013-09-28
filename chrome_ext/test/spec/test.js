/*global describe, it */
(function () {
    describe('Our expected test-runner environment is set up', function () {
        describe('Ensure Chai to be there', function () {
            var foo = 'bar'
            var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
            it('should be using expect style assertions', function () {
              expect(foo).to.be.a('string');
              expect(foo).to.equal('bar');
              expect(foo).to.have.length(3);
              expect(beverages).to.have.property('tea').with.length(3);
            });
        });
    });
})();
