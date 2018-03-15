

$(document).ready(function(){
	$('body').height(1200);
	$("#contentContainer a").mouseenter(function(){
		$(this).animate({"font-size": "+=2"}, 100);
	});
	$("#contentContainer a").mouseleave(function(){
		$(this).animate({"font-size": "-=2"}, 100);
	});
	$(".listContainer").click(function(){
		console.log("click");
		if($(this).find("#gifContainer").length!=0){
			$(this).find("#gifContainer").children().each(function () {
				$(this).finish();
			});
			$(this).find("#gifContainer").slideUp("slow", function(){
				$(this).empty();
				$(this).show();
			});
			console.log("leave");
		}
		
	});
	
	$("#header").click(function(){
		window.location= "./index.html";
	});

	$(".listContainer a").mouseenter(function(){
		if($(this).parent().parent().parent().find("#gifContainer").length==0){
			return;
		}
		if(this.id==""){
			return;
		}
		console.log(this.id);
		if($(this).parent().parent().parent().find("#gifContainer").find("#mainGif").length==0){
			$(this).parent().parent().parent().find("#gifContainer").append("<div id=mainGif></div>");
			
			$(this).parent().parent().parent().find("#gifContainer").find("#mainGif").append("<img src=''");
			mainGif= $(this).parent().parent().parent().find("#gifContainer").find("#mainGif");
			mainGif.append("<img src=''>");
			newImg=mainGif.find("img");
			newImg.attr("src", this.id+".gif");
			newImg.css({
						"width": "100%",
						"vertical-align": "middle",
						"margin":"0px",

						//"position": "absolute",
						
						});
			mainGif.css({
						"display": "none",
						"margin-bottom": "0px",
						"margin-left":"5%",
						"margin-right":"5%",
						"width": "86%",
						"height":"auto",
						"vertical-align": "middle",
						"padding": "2%",
						"background-color": "#76B041",
						});
			//newImg.hide();
			$(this).parent().parent().parent().find("#gifContainer").append("<div id='dateContainer'></div>");
			$(this).parent().parent().parent().find("#gifContainer").append("<div id='titleContainer'></div>");
			dateTag= $(this).parent().parent().parent().find("#gifContainer").find("#dateContainer");
			titleTag=$(this).parent().parent().parent().find("#gifContainer").find("#titleContainer");
			dateTag.css({
						"display": "none",
						"background-color":"#17BEBB",
						"margin-left":"5%",
						"margin-right":"5%",
						"width": "90%",
						"height": "40px",
						"vertical-align": "middle",
						"margin-bottom": "0px",
												
					});
			titleTag.css({
						"display": "none",
						"background-color":"#E4572E",
						"margin-left":"5%",
						"margin-right":"5%",
						"width": "90%",
						"height": "40px",
						"vertical-align": "middle",
						"margin-bottom": "10px",
												
					});

			dateTag.append("<p>"+$(this).parent().find("p").text()+"</p>");
			dateTag.find("p").css("margin", "0px");
			titleTag.append("<p>"+$(this).parent().find("a").text()+"</p>");
			titleTag.find("p").css("margin", "0px");
			mainGif.slideDown(500, function(){

			});
			dateTag.delay(1000).slideDown(100, function(){
				

			});
			titleTag.delay(1200).slideDown(100, function(){
				

			});
		}

		else{
			$(this).parent().parent().parent().find("#gifContainer").find("img").attr("src", this.id+".gif");
			$(this).parent().parent().parent().find("#gifContainer").find("#dateContainer").find("p")
			.text($(this).parent().find("p").text());
			
			$(this).parent().parent().parent().find("#gifContainer").find("#titleContainer").find("p")
			.text($(this).parent().find("a").text());
		}
	});
	


});
var animIds= ['Rlpd4flr4Mw', '-jtEymgpo8E','dSmXc311RaI', 'fvMY7RMTDdY', 'usL58yPUyzI', 'Ea8Lx6KHWRc', 'jhInsh1aVQY', 'KC-dNi3iDdM']
function onYouTubeIframeAPIReady() {
	for(var i=0; i<animIds.length; i++){
		var $newItem = $("<div>", {id: "muteYouTubeVideoPlayer"+i, "class": "animVideo"});
		$('body').append($newItem);
		var player;
		player = new YT.Player('muteYouTubeVideoPlayer'+i, {
			videoId: animIds[i], // YouTube Video ID
			width: 560,               // Player width (in px)
			height: 316,              // Player height (in px)
			playerVars: {
			  autoplay: 1,        // Auto-play the video on load
			  controls: 0,        // Show pause/play buttons in player
			  showinfo: 0,        // Hide the video title
			  modestbranding: 1,  // Hide the Youtube Logo
			  loop: 1,            // Run the video in a loop
			  fs: 0,              // Hide the full screen button
			  cc_load_policy: 0, // Hide closed captions
			  iv_load_policy: 3,  // Hide the Video Annotations
			  autohide: 0,         // Hide video controls when playing
			  playlist: animIds[i]
			},
			events: {
			  onReady: function(e) {
			    e.target.mute();
			  }
			}
		});
		
	}
	
 }


