chrome.browserAction.onClicked.addListener(function() {
  // alert('gotclicked');
  // Set a timeout to briefly display our image and then set it back
  setTimeout(function() {
    chrome.browserAction.setIcon({
      path: 'images/icon-38.png'
    });
  }, 5000);

  chrome.browserAction.setIcon({path:"images/icon-38-saved-state.png"});
});

chrome.browserAction.setIcon({path:"images/icon-38.png"});
