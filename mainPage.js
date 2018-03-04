

$(document).ready(function(){
	$("#contentContainer a").mouseenter(function(){
		$(this).animate({"font-size": "+=2"}, 100);
	});
	$("#contentContainer a").mouseleave(function(){
		$(this).animate({"font-size": "-=2"}, 100);
	});
	
	$("#header").click(function(){
		window.location= "./index.html";
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


