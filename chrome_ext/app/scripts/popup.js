var google = new OAuth2('google', {
  clientId: '361603295265.apps.googleusercontent.com',
  clientSecret: 'IBR_QmA2FmtZG7vBE3SkO9v',
  apiScope: 'https://www.googleapis.com/auth/userinfo.profile'
});

function buildUserData(provider) {
  // Once we have a valid token that has been scoped to userinfo.profile, 
  // we can actually request the data required here.
  $.ajax({
    type: 'GET',
    url: 'https://www.googleapis.com/userinfo/v2/me',
    headers: {'Authorization': 'OAuth ' + provider.getAccessToken()}
  }).done(function(user) {
    var q = {'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT};
    chrome.tabs.query(q, function(tabs) {
      var tile = {'pageURL': tabs[0].url,
        'pageTitle': tabs[0].title,
        'uid': user.id
      };
      var req1 = {type: 'POST', url: 'http://localhost:3000/users', data: user};
      var req2 = {type: 'POST', url: 'http://localhost:3000/tiles', data: tile};
      $.ajax(req1).done(function (data) {
        $.ajax(req2, function() { console.log('bar'); });
      });
    });
  });
}

function checkAuthorized() {
  ['google'].forEach(function(providerName) {
    var provider = window[providerName];
    var button = document.querySelector('#' + providerName);

    if (!localStorage.getItem('linkShareAuth')) {
      var result = buildUserData(provider);
      localStorage.setItem('linkShareAuth', result);
    }

    if (provider.hasAccessToken()) {
      button.classList.add('authorized');
    } else {
      button.classList.remove('authorized');
    }
  });
}

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


document.addEventListener('DOMContentLoaded', function () {
  authorize('google');
  buildUserData(window.google);
});
