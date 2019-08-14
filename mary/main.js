$(document).ready(function(){

	console.log("hello world");

	$(".door").click(
		function() {
			var referencedImg = this;
			$(referencedImg).prepend("<img class='doorEnterText' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='</img>");
			
			$(referencedImg).find(".doorAnim").attr("src","./gifs/main_doorOpening.gif");
			
			setTimeout(function(){
				$(referencedImg).find(".doorAnim").attr("src","./gifs/main_doorOpen.gif");	
				$(referencedImg).find(".doorEnterText").attr("src","./gifs/main_enterType.gif");
				//$(referencedImg).prepend("<img class='doorEnterText' src='./gifs/main_enterType.gif'></img>");
				
					
				//$(enterTextAdded).find("img").attr("src","./gifs/main_enterFinish.gif");
				setTimeout(function(){
					console.log(referencedImg);
					$(referencedImg).find(".doorEnterText").attr("src","./gifs/main_enterFinish.gif");
					$(referencedImg).find(".doorEnterText").click(function(){
						$(referencedImg).find(".doorAnim").attr("src","./gifs/main_doorClosed.gif");
						var URL = $(referencedImg).attr("href");
						console.log(referencedImg);
    					window.open(URL,'_blank','',''); 	
					});
					
				}, 200);
				

			}, 200);

			

	 	}
	 // 	,
	 // 	function() {
	 // 		$(this).find(".doorEnterText").remove();
		// 	$(this).find("img").attr("src","./gifs/main_doorClosed.gif");
		// }
	);

	$(".door").hover(
		function() {
			var referencedImg = this;
			$(referencedImg).prepend("<img class='doorEnterText' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='</img>");
			
			$(referencedImg).find(".doorAnim").attr("src","./gifs/main_doorOpening.gif");
			
			setTimeout(function(){
				$(referencedImg).find(".doorAnim").attr("src","./gifs/main_doorOpen.gif");	
				$(referencedImg).find(".doorEnterText").attr("src","./gifs/main_enterType.gif");
				//$(referencedImg).prepend("<img class='doorEnterText' src='./gifs/main_enterType.gif'></img>");
				
					
				//$(enterTextAdded).find("img").attr("src","./gifs/main_enterFinish.gif");
				setTimeout(function(){
					
					$(referencedImg).find(".doorEnterText").attr("src","./gifs/main_enterFinish.gif");
					$(referencedImg).find(".doorEnterText").click(function(){
						$(referencedImg).find(".doorAnim").attr("src","./gifs/main_doorClosed.gif");
						var URL = $(referencedImg).attr("href");
						console.log(referencedImg);
    					window.open(URL,'_blank','',''); 	
					});
					
				}, 200);
				

			}, 200);

			

	 	}
	 	,
	 	function() {
	 		$(this).find(".doorEnterText").remove();
			$(this).find("img").attr("src","./gifs/main_doorClosed.gif");
		}
	);

});



























//prom?