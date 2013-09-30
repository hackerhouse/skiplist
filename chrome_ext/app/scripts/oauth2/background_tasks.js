//
// Background tasks.js is extracted
//
/**
 Dispatches a message that is processed in the 'foreground' of the extension.
 @see chrome_ext/app/scripts/authentication.js
 @method processResponse
 @param {String} resp HTTP response text
 @param {XMLHttpRequest} xhr server request headers
**/
function processResponse(resp, xhr) {
  chrome.runtime.sendMessage({
    tag: "processResponse",
    content: { resp: resp, xhr: xhr }
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
