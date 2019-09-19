

$(document).ready(function(){
	$("#info").delay(3000).fadeTo( "slow" , 0.5, function() {
    // Animation complete.
	});


	$("#info").mouseover(function(){
		$("#info").fadeTo( "fast" , 1.0, function() {
	    	$("#info").delay(6000).fadeTo( "slow" , 0.5, function() {
		    // Animation complete.
			});
		});
	});
});

