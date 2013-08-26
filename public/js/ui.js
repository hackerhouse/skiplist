$(function() {
    $(".option.delete").click(function() {
	var $tile = $(this).parents(".tile");
	$tile.fadeOut();

        $.ajax({
            type: "DELETE",
            url: "http://localhost:3000/tiles/" + $(this).val(),
	    contentType: "application/json",
	    data: {}
        }).done(function(data) {	    

	});
    });
})