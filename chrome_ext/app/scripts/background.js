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
    }).done(function(res) {
      var tiles          = JSON.parse(localStorage.tiles);
      tiles[tile.url]    = true;
      localStorage.tiles = JSON.stringify(tiles);
      chrome.browserAction.setIcon({path:"images/icon-38-saved-state.png"});
    });
  });
};


function updatePageIcon(tabId) {
  console.log('Update page icon');
  chrome.tabs.get(tabId, function(tab) {
    console.log('tab');
    console.log(tab);
    if ( !JSON.parse(localStorage.tiles)[tab.url] ) {
      console.log('got here');
      chrome.browserAction.setIcon({path:"images/icon-38.png"});
    } else {
      chrome.browserAction.setIcon({path:"images/icon-38-saved-state.png"});
    }
  });
}

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Set up our local cache of tiles.
  localStorage.tiles = JSON.stringify({});

  // browserAction.onClicked refers specifically to the Extension Icon's click event.
  chrome.browserAction.onClicked.addListener(function() {
    Skiplist.postTile();
  });

  // Make sure we set back our Icon to normal when we go to a new tab.
  chrome.tabs.onUpdated.addListener(function(tabId)  {
    console.log('called onUpdated');
    updatePageIcon(tabId);
  });
  chrome.tabs.onCreated.addListener(function(tabId)  {
    console.log('called onCreated');
    updatePageIcon(tabId);
  });

  // onHighlighted (changing tabs) gives an array of tabIds. 
  var tabId;
  chrome.tabs.onHighlighted.addListener(function(highlightInfo)  {
    for (i = 0, len = highlightInfo.tabIds.length; i < len; i++) {
      tabId = highlightInfo.tabIds[i];
      console.log('called onHighlighted');
      updatePageIcon(tabId);
    }
  });


});
