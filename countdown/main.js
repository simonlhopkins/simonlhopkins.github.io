var countDownDate;
var distanceAtCreation;
var c;
var ctx;
var simonImg;
var charlieImg;
var heartImg;
var simonLoaded = false;
var charlieLoaded = false;
var heartLoaded = false;
$(document).ready(function(){
	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");
	countDownDate = new Date("Nov 20, 2018 15:00:00").getTime();
	//countDownDate = new Date("Nov 6, 2018 18:52:00").getTime();

	distanceAtCreation = countDownDate - new Date("Nov 6, 2018 18:02:00").getTime();
	countdown();
	console.log(countDownDate);
	simonImg = new Image();
	charlieImg = new Image();
	heartImg = new Image();
	simonImg.onload = function(){
		simonLoaded = true;
	};
	charlieImg.onload = function(){
		charlieLoaded=true;
	};
	heartImg.onload = function(){
		heartLoaded=true;
	};
	simonImg.src = "./simon.png"; 
	charlieImg.src = "./charlie.png"; 
	heartImg.src = "./heart.png";

	setInterval(countdown, 1000);

});


function draw(percent){
	c.width = window.innerWidth;
    c.height = window.innerHeight;
	
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, c.width, c.height);
	ctx.strokeStyle = 'red';
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.moveTo(0,50);
	ctx.lineTo(c.width,50);
	ctx.stroke();
  // set line color
 

	var imageHeight = 100;
	var imageWidth = imageHeight*0.75;
	ctx.drawImage(heartImg, (window.innerWidth/2)-50,0, 100, 100);
	distanceTraveled = ((window.innerWidth-imageWidth)/2)*(1-percent);
	ctx.drawImage(simonImg, window.innerWidth- distanceTraveled - imageWidth,0, imageWidth, imageHeight);
	ctx.drawImage(charlieImg, distanceTraveled,0, imageWidth, imageHeight);

	
	
}

function countdown(){
	var now = new Date().getTime();
	var distance = countDownDate - now;
	if(distance<=0){
		distance=0;
	}
	var percentLeft = distance/distanceAtCreation;
  // Time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	$("#timerContainer").find("h1").text(days+":"+hours+":"+minutes+":"+seconds);
	if(simonLoaded && charlieLoaded && heartLoaded){
		draw(percentLeft);
	}
	
	
}