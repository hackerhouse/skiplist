$(function() {
  $(".option.delete").on('click', function() {
    var $tile = $(this).parents(".tile");
    $tile.fadeOut();

    $.ajax({
      type: "DELETE",
      url: "/tiles/" + $(this).val(),
      contentType: "application/json",
      data: {}
    }).done(function(data) {

    });
  });
});
