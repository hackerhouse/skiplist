/**
  This file contains a simple object to contain any initialization logic that
  may need to exist for the chrome extension, namely.

  - Global config parameters: The top level file config.json contains
  parameters that are handled by grunt-replace that change global configuration
  details, such as the remote URL used in communicating setting up skiplist.

  - Namespacing: Even though we are isolated from the page (as well as from
  other scripts), this should be injected along with JQuery and give us a nicer
  application namespace to work in.

**/

var Skiplist = window.SkipList  = {};

// Remote skiplist host
Skiplist.remoteURL = "http://@@hostname:@@port";

// Currently supported OAuth2 providers
Skiplist.providers = ["google"];

// The client ID identifies the application to Google, Github and so on.  The
// client (or rather application) secret is not strictly nessasary for 2l
// client side oauth, but is useful for keeping a value on hand for other
// Google API services such as Chrome shared data.
Skiplist.providerTokens = {
  google: {
    clientID: "@@auth.google.clientID",
    clientSecret: "@@auth.google.clientSecret"
  }
};

//
// helper methods
//

// Because we debug a page context rather than the 'whole extension', it is
// tough to get access to a window that we can log messages to in a fashion
// similar to the regular JS console. Instead, we just send new messages we'd
// like logged as a post to this.remoteURL + '/log'.
Skiplist.log = function(message) {
  console.log(message);
  $.ajax({
    type: 'POST',
    url: Skiplist.remoteURL + '/log',
    data: message
  });
};

// Raises an exception if there is no currentUser.
Skiplist.currentUser = function() {
  var currentUser = localStorage.currentUser;
  if (!currentUser) { throw("No current user saved"); }
  return JSON.parse(currentUser);
};
