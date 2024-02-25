$(document).ready(function(){  // do not delete 


// first line sets the item to a faded state immediately
$('img').css('opacity', '0.25');

$('img').mouseenter(function() {
	$(this).fadeTo('fast', 1)
});

$('img').mouseleave(function() {
	$(this).fadeTo('fast', 0.25);
});


// ----------------------------------------------------------------------------
}); // do not delete
