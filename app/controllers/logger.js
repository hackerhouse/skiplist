// This is simply for convienence when recieving messages from an extension
// that debugs a page context rather than a 'whole extension'. We just send new
// messages we'd like logged in the extension as a post to '/log'.
exports.update = function(req, res) {
  console.log(req.body);
  res.send('logged');
}
