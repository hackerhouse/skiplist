// Add an event listener for button.btn clicks and begin the OAuth flow here.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.btn').addEventListener('click', function () {
    var provider = (this.id).toString();
    chrome.extension.getBackgroundPage().initOAuthFlow(provider);
    // We don't need to use this popup anymore.
    chrome.browserAction.setPopup({popup: ""});
    window.close();
  });
});
