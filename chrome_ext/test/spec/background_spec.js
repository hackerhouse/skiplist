/*global describe, it */
mocha.setup({globals: ["chromeExOAuthConfig", "chromeExOAuth", "chromeExOAuthRedirectStarted", "chromeExOAuthRequestingAccess"]});
(function () {
  console.log(this);
  window.thisa = this;
    describe('background', function () {
      describe('initOAuthFlow', function () {

        it('Should exist', function() {
          expect(initOAuthFlow).to.be.ok;
        });

        it('Should reject nonstring providers', function() {
          var error = 'Provider should be string';
          // I use capital Throw here because of javascript-vim complaining
          expect(initOAuthFlow).to.Throw('Provider should be string');
          expect(function() { initOAuthFlow({}); }).to.Throw(error);
          expect(function() { initOAuthFlow(null); }).to.Throw(error);
        });

        it('Should reject bad providers', function() {
          var error = 'Unrecognized provider';
          var generic   = function() { initOAuthFlow('facebook'); };
          var faceplace = function() { initOAuthFlow('facebook'); };
          expect(generic).to.Throw(error);
          expect(faceplace).to.Throw(error);
        });


      });
    });
})();
