/**
  @method processResponse
  @param  {Object} message an object representing the endpoint response
  @see controllers/user.js

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
function processResponse(message) {
  // Begin authentication
  var user = JSON.parse(message.resp);
  console.log("Sucessfully parsed message recieved from OAuth endpoint");
  console.log(user);
  $.ajax({
    type: 'POST',
    url: Skiplist.remoteURL + 'users',
    data: user
   }).done(function (data) {
     console.log("Sucessfully posted data");
     console.log(data);
     // If the user is new, pop a dialog asking for name, etc.
     // Otherwise just let the user know he's logged in.
  });
}

/**
 Processing messages in an isolated background page is more difficult than
 nessasary. To eliminate the need to process in the background page, we dispatch
 a message which is listened for here.
**/
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.tag == "processResponse") {
      processResponse(request.content);
  }
});
