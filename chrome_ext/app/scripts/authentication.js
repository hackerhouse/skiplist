// Authentication Related Background Tasks
/**
 Processes the authentication response from the OAuth endpoint, dispatching a
 message to our own server and storing information about the current user.
 @method processResponse
 @param {String} resp HTTP response text
 @param {XMLHttpRequest} xhr server request headers
 @see controllers/user.js

  Example Responses:
    Google:
     user: {
         id: '105503159085383028265',
         name: 'Zephyr Pellerin',
         given_name: 'Zephyr',
         family_name: 'Pellerin',
         link: 'https://plus.google.com/105503159085383028265',
         picture: 'https://lh6.googleusercontent.com/AK18/.../photo.jpg',
         gender: 'male',
         birthday: '1992-01-19',
         locale: 'en'
     }
**/
function processResponse(resp, xhr) {
  var user = JSON.parse(resp);

  // commit some information about the user to localStorage.
  localStorage.currentUser = resp;

  // Begin authentication
  console.log("Sucessfully parsed response from OAuth endpoint");
  console.log(user);
  $.ajax({
    type: 'POST',
    url: Skiplist.remoteURL + '/users',
    data: user
  }).done(function (data) {
    // We could do a lot here.
    // If the user is new, pop a dialog asking for name, etc.
    // Otherwise just let the user know he's logged in.
  });
}

/**
 Serves as a callback to @method initOAuthFlow
**/
function onAuthorized() {
  var url = 'https://www.googleapis.com/oauth2/v2/userinfo';
  window.provider.sendSignedRequest(url, processResponse);
}

/**
 @method initOAuthFlow
 @param {String} provider signifies which provider will serve as our OAuth
        endpoint.
**/
function initOAuthFlow(provider) {
  if(typeof provider != 'string') {
    throw(new TypeError('Provider should be string'));
  }

  var providerId = provider.toLowerCase();
  switch (providerId) {
    case 'google':
      window.provider = ChromeExOAuth.initBackgroundPage({
        'request_url' : 'https://www.google.com/accounts/OAuthGetRequestToken',
        'authorize_url' : 'https://www.google.com/accounts/OAuthAuthorizeToken',
        'access_url' : 'https://www.google.com/accounts/OAuthGetAccessToken',
        'consumer_key': 'anonymous',
        'consumer_secret': 'anonymous',
        'scope' : 'https://www.googleapis.com/auth/userinfo.profile',
        'app_name' : 'Skiplist'
      });
      window.provider.authorize(onAuthorized);
      break;
    case 'github':
      // stub
      break;
    default:
      throw(new Error('Unrecognized provider'));
  }
}

