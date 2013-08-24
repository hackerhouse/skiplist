  var google = new OAuth2('google', {
    client_id: '361603295265.apps.googleusercontent.com',
    client_secret: 'IBR_QmA2FmtZG7vBE3Sk_o9v',
    api_scope: 'https://www.googleapis.com/auth/userinfo.profile'
  });

  function authorize(providerName) {
    var provider = window[providerName];
    provider.authorize(checkAuthorized);
  }

  function clearAuthorized() {
    ['google'].forEach(function(providerName) {
      var provider = window[providerName];
      provider.clearAccessToken();
    });
    checkAuthorized();
  }

  function checkAuthorized() {
    ['google'].forEach(function(providerName) {
      var provider = window[providerName];
      var button = document.querySelector('#' + providerName);

      if (!localStorage.getItem('linkShareAuth')) {
        var result = buildUserData(provider)
        localStorage.setItem('linkShareAuth', result);
      }

      // Save this logic for when we actually want to try to switch on the
      // state of authorization.
      // if (provider.hasAccessToken()) {
      //   button.classList.add('authorized');
      // } else {
      //   button.classList.remove('authorized');
      // }
    });
  }

  function buildUserData(provider) {
    // Once we have a valid token that has been scoped to userinfo.profile, 
    // we can actually request the data required here.
    $.ajax({
      type: "GET",
      url: "https://www.googleapis.com/userinfo/v2/me",
      headers: {'Authorization': 'OAuth ' + provider.getAccessToken()}
    }).done(function( msg ) {
      var options = {
        user: msg 
      }
      chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
       function(tabs) { 
         options['pageURL'] = tabs[0].url;
         options['pageTitle'] = tabs[0].title;
          $.ajax({type: 'POST', url: 'http://localhost:3000/tiles', data: options})
        });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    authorize('google');
    buildUserData(window['google']);
  });
