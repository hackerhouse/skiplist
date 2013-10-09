var Skiplist = (function($, moment) {
  this.Templates = Templates;
  var $tiles = $('.tile'),
  $timeStamps = $tiles.find('.timeStamp');

  console.log($tiles);
  $.each($tiles, function(index, tile) {
    var date = $(tile).find('.timeStamp').attr('data-time-stamp'),
    $timeStamp = $(tile).find('.timeStamp'),
    timeText = moment(date).fromNow();

    $timeStamp.text(timeText);
  });

  var update = function() {
    $.each($timeStamps, function(index, timeStamp) {
      var timeText = moment($(timeStamp).attr('data-time-stamp')).fromNow();
      if ($(timeStamp).text() !== timeText) {
        $(timeStamp).text(timeText).fadeIn();
      }
    });
  };

  var loop = function() {
    setTimeout(loop, 20000);
    console.log('Timestamps Updated.');
    update();
  };

  loop();

  var socket = io.connect('http://localhost');
  socket.on('connection_established', function (message) {
    console.log(message);
  });

  socket.on('tile_added', function (tileData) {
    // Once the tile type is added on to the
    // response, I can have it render that particular template instead.
    // if (tile.type === 'image') {};
    var $newTile = $(Templates.tile.render(tileData)).prependTo('#columns').fadeIn().removeClass('newTile');
    console.log(tileData);
  });
})(jQuery, moment, Templates);
