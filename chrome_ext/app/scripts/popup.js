// At this point we shoudl just ask for profile information
var google = new OAuth2('google', {
  clientId: Skiplist.providerTokens.google.clientID,
  clientSecret: Skiplist.providerTokens.google.clientSecret,
  apiScope: 'https://www.googleapis.com/auth/userinfo.profile'
});

document.addEventListener('DOMContentLoaded', function () {
  authorize('google');
  buildUserData(window.google);
});
