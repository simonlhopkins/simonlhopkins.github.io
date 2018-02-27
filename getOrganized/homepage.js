var instaPhotos=[];
$(document).ready(function(){
	getInstaPhotos();

});



$(document).on("mouseenter", ".dropdown", function(){
	var $contents= $(this).find(".dropdownContents");
	$contents.fadeIn(200);

});
$(document).on("mouseleave", ".dropdown", function(){
	var $contents= $(this).find(".dropdownContents");
	$contents.fadeOut(200);
	//$contents.css("display","none");
});

function getInstaPhotos(){
    var feed = new Instafeed({
        get: 'user',
        userId: 324507363,
        clientId: '4c8f433ea6ad4daa8869e205b6fbd07b',
        accessToken:'324507363.4c8f433.a9295c0b8a2f45fc9b84892e647a6333',
        target:"collageWrapper",
        // after: populatePage()
        resolution: "standard_resolution",
        after:function(){
        	$("#collageWrapper").children().each(function(){
        		instaPhotos.push($(this)[0]["innerHTML"]);

        	});

        	populatePage();
        }
    });

    feed.run();
    

}

function populatePage(){
	$("#collageWrapper").remove();
	$("body").append("<div id='collageWrapper'></div>")
	for(var i =0; i<instaPhotos.length;i++){
		var newMediaSquare= $("<div class='mediaSquare'></div>").appendTo("#collageWrapper");
		newMediaSquare.append(instaPhotos[i]);

	}
	$(".mediaSquare > img").each(function(){
		$(this).css("height", Math.random()*500);
	});
	$('#collageWrapper').masonry({
		itemSelector: '.mediaSquare'
		
	});


}
