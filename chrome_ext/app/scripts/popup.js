window.google = new OAuth2('google', {
  clientId: Skiplist.providerTokens.google.clientID,
  clientSecret: Skiplist.providerTokens.google.clientSecret,
  apiScope: 'https://www.googleapis.com/auth/userinfo.profile'
});

function authenticate() {
  // whack alert
  var provider = (this.id).toString();
  window.providera = provider;
  console.log("provider");
  console.log(provider);
  authorize(provider);
  buildUserData(window[authenticate]);
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.btn').addEventListener('click', authenticate);
});
