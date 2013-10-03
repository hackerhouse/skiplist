// Set our icon (We will want to set it here so we can alter it later)
chrome.browserAction.setIcon({path:"images/icon-38.png"});

// This method posts our current window's tile and some associated information.
Skiplist.postTile = function() {
  var query = {'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT};
  chrome.tabs.query(query, function(tabs) {
    var tab = tabs[0];
    var tile = {
      tab_id: tab.id,
      window_id: tab.window_id,
      active: tab.active,
      url: tab.url,
      title: tab.title,
      user: {
        oauth_id: Skiplist.currentUser()
      }
    };
    $.ajax({
      type: 'POST',
      url: Skiplist.remoteURL + '/tiles',
      data: tile
    });
  });
};

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // browserAction.onClicked refers specifically to the Extension Icon's click event.
  chrome.browserAction.onClicked.addListener(function() {
    Skiplist.postTile();
  });
});
