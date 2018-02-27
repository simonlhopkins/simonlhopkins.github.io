$(document).ready(function(){
	console.log("Hello World")
});

var correctAudio= document.getElementById("correctSound");
var incorrectAudio= document.getElementById("incorrectSound");


function submitButtonClicked(){
	//$("#contentArea").empty();
	passwordAttempt=$("#password").val().toUpperCase().replace(/ /g, "").replace(/'/g, "");
	if(passwordAttempt=="FOXTROT"){
		printImage("policeWithBaton");
	}
	else if (passwordAttempt=="TANGO"){
		printImage("goose");
	}
	else if (passwordAttempt=="GOOSE"){
		printImage("sharkWithWheels", "http://sharkwithwheels.com/");
	}
	else if (passwordAttempt=="SHARKWITHWHEELS"){
		printImage("longJohnSilvers");
	}
	else if (passwordAttempt=="LONGJOHNSILVERS"){
		printImage("dorixona");
	}
	else if (passwordAttempt=="DORIXONA"){
		printImage("zodiac");
	}
	else if (passwordAttempt=="ZODIAC"){
		printImage("LP", "https://www.facebook.com/elle.pee.9028");
	}
	else if (passwordAttempt=="LP"){
		printImage("NTK");
	}
	else if (passwordAttempt=="NTK"){
		printImage("S9B", "https://twitter.com/paralleltexts");
	}
	else if (passwordAttempt=="S9B"){
		printImage("H6Q");
	}
	else if (passwordAttempt=="H6Q"){
		printImage("weapons", "https://www.youtube.com/");
	}
	else if (passwordAttempt=="WEAPONS"){
		printImage("granted", "https://www.fbi.gov/");
	}
	else{
		printImage("police");
	}
};

function printImage(imageName, site=null){
	if(imageName=="police"){
		incorrectAudio.play();
	}
	else{
		correctAudio.play();
	}
	var newDiv=$("<div></div>");
	for(var i=0; i<asciiArtPics[imageName].length; i++){

		newLine=asciiArtPics[imageName][i].replace(/ /g, "&nbsp")
		
		if(site != null){
			var randomNum= Math.random();
			if(randomNum<0.2){
				newLine= "<a href="+site+" target='_blank'>"+newLine+"</a>";
			}
		}
		newDiv.append("<b>"+newLine+"</b><br>");
	}
	$("#contentArea").prepend(newDiv);
	$("#contentArea").prepend("<br>");
}