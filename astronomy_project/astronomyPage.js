

var starInfoList=[];
var starSizeModifier=1;

// var req = new XMLHttpRequest();
// req.open('GET', "http://www.astropical.space/astrodb/api.php?table=stars&which=radius&limit=0.5&format=json", false);
// req.send(null);
// var headers = req.getAllResponseHeaders().toLowerCase();
// alert(headers);
 
var xhr= new XMLHttpRequest();
//xhr.open("GET", "http://www.astropical.space/astrodb/api.php?table=stars&which=distance&limit=250&format=json", false);
xhr.open("GET", "http://www.astropical.space/astrodb/api.php?table=stars&which=radius&limit=0.5&format=json", false);
xhr.send();
var starJSONtext=xhr.responseText;

starJSONtext=starJSONtext.replace('"sao": ,', '"sao": "",')
var json= JSON.parse(starJSONtext);
json.hipstars["star0"]={ "id": "0",
 						"name": "The Sun",
						"desig": "Solar System",
						"mag": -26.74,
						"dist": 0,
						"rad": -45.9,
						"spk": "G2V",
						"teff": 5778,
						"mass": 1,
						"radius": 1,
						"ra": 0,
						"de": 0};
var distanceScaler=40;
var sizeScaler=6;
var maxX=0;
var maxY=0;
var maxZ=0;
var audioCtx = new (window.AudioContext || window.webkitAudioContext);
var gainNode = audioCtx.createGain();
gainNode.gain.value=0.3;
var isMuted=false;

var oscillator = audioCtx.createOscillator();

oscillator.start(0);
var numberOfStars=0;

function toRadians (angle) {
  return angle * (Math.PI / 180);
}
var starCoordinateDict={};
$(document).ready(function(){
	var ambientAudio= document.getElementById("ambientAudio");
	ambientAudio.loop=true;
	ambientAudio.volume=0.1;
	ambientAudio.play();
	$("img").each(function(){
		if(this.src==="https://cloud.githubusercontent.com/assets/23024110/20663010/9968df22-b55e-11e6-941d-edbc894c2b78.png"){
			$(this).parent().remove();
		}
	});
	
	//this for loop calculates the max x, max y, and max z
	for(key in json["hipstars"]){
		var currentStar=json["hipstars"][key]
		var distance= currentStar["dist"];
		var ra= currentStar["ra"];
		var dec= currentStar["de"];
		var PHI = toRadians(ra*15);
		var THETA= toRadians(dec);
		var RHO= distance;
		var RVERT= RHO * Math.cos(THETA);
		var x= RVERT*Math.cos(PHI);
		var y= RVERT*Math.sin(PHI);
		var z= RVERT*Math.sin(THETA);
		if(Math.abs(x)>maxX){
			maxX=Math.abs(x);
		}
		if(Math.abs(y)>maxY){
			maxY=Math.abs(y);
		}
		if(Math.abs(z)>maxZ){
			maxZ=Math.abs(z);
		}
		
	}
	//this one sets the colors and positions and size
	for(key in json["hipstars"]){
		
		var currentStar=json["hipstars"][key]
		var distance= currentStar["dist"];
		var ra= currentStar["ra"];
		var dec= currentStar["de"];
		var PHI = toRadians(ra*15);
		var THETA= toRadians(dec);
		var RHO= distance;
		var RVERT= RHO * Math.cos(THETA);
		var x= RVERT*Math.cos(PHI);
		var y= RVERT*Math.sin(PHI);
		var z= RVERT*Math.sin(THETA);
		newStar= $('<svg id=star'+currentStar["id"]+' class ="star" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><defs><style>.cls-1{fill:#fff;}</style></defs><title>star</title><path id="circle" class="cls-1" d="M240,479.5A239.5,239.5,0,0,1,70.65,70.65a239.5,239.5,0,0,1,338.7,338.7A237.93,237.93,0,0,1,240,479.5Z"/></svg>').appendTo("#starImageContainer");
		
		starCoordinateDict["star"+currentStar["id"]]=[(x*distanceScaler)+(maxX*distanceScaler)-(currentStar["radius"]*sizeScaler/2),
														(y*distanceScaler)+(maxY*distanceScaler)-(currentStar["radius"]*sizeScaler/2),
														z];
		starCoordinateDict["sun"]=[maxX*distanceScaler, maxY*distanceScaler, 0.5];
		
		newStar.css({"width":currentStar["radius"]*sizeScaler+"px","height": currentStar["radius"]*sizeScaler+"px"});
		newStar.css({"top":(y*distanceScaler)+(maxY*distanceScaler)-(currentStar["radius"]*sizeScaler/2), "left":(x*distanceScaler)+(maxX*distanceScaler)-(currentStar["radius"]*sizeScaler/2)});
		newStar.css("opacity", ((maxZ+z)/(2*maxZ)));
		newStar.css("z-index", Math.round(maxZ+z))
		color=currentStar["spk"][0].replace(/\s/g, '');
		switch(color){
			case "O":
				newStar.find("path").css("fill", "#9bb0ff");
				break;
			case "B":
				newStar.find("path").css("fill", "#aabfff");
				break;
			case "A":
				newStar.find("path").css("fill", "#cad8ff");
				break;
			case "F":
				newStar.find("path").css("fill", "#fbf8ff");
				break;
			case "G":
				newStar.find("path").css("fill", "#fff4e8");
				break;
			case "K":
				newStar.find("path").css("fill", "#ffddb4");
				break;
			case "M":
				newStar.find("path").css("fill", "#ffddb4");
				break;	
			default:
				newStar.find("path").css("fill", "pink");
		}
	}
	
	
	
	
	numberOfStars=Object.keys(json["hipstars"]).length
	
	$("#sunText").css({"top":starCoordinateDict["star0"][1]-25,
						"left":starCoordinateDict["star0"][0]-260})
	$("#sunText").fadeTo(5000,0.2, function(){});
	$(document).scrollTop((maxY*distanceScaler)-($(window).height()/2));
	$(document).scrollLeft((maxX*distanceScaler)-($(window).width()/2));
});
$(document).on("mouseenter", "#sunText", function(){
	$(this).stop();
	$("#sunText").fadeTo(1000,1, function(){});
});
$(document).on("mouseleave", "#sunText", function(){
	$(this).stop();
	$("#sunText").fadeTo(1000,0.2, function(){});
});


$(document).on("mouseenter", ".star", function(){
	$(this).stop();
	var focusedStar= json["hipstars"][$(this).attr("id")];
	$(this).animate({height:'+=40',width:'+=40',left:"-=20",top:"-=20"}, 300);
	//$(this).fadeTo(300, 1);

})
$(document).on("mouseleave", ".star", function(){
	$(this).stop();
	var focusedStar= json["hipstars"][$(this).attr("id")];
	$(this).animate({height: (focusedStar["radius"]*sizeScaler), width:(focusedStar["radius"]*sizeScaler),top:starCoordinateDict[$(this).attr("id")][1],
						left:starCoordinateDict[$(this).attr("id")][0]}, 300);
	//$(this).fadeTo(300, ((maxZ+starCoordinateDict[$(this).attr("id")][2])/(2*maxZ)));
})



$(document).on("click", ".star", function(event){
	var focusedStar= json["hipstars"][$(this).attr("id")];
	$("#popUpContainer").empty();
	var popUpBox= $("<div class='popUpBox'>"+ 
				
				"<p><span class='toolTip'>Star System<span class='toolTipText'>Name of the star system this star is found in</span></span>: "+focusedStar["desig"]+"</p>"+
				"<p><span class='toolTip'>Radius<span class='toolTipText'>The radius of star relative to the sun</span></span>: "+focusedStar["radius"]+" Solar Radians</p>"+
				"<p><span class='toolTip'>Spectral Class<span class='toolTipText'>The Spectral Class is based on temperature, this also determines the color!</span></span>: "+focusedStar["spk"]+"</p>"+
				"<p><span class='toolTip'>Distance from the Sun<span class='toolTipText'>Lightyears away from the Sun</span></span>: "+focusedStar["dist"]+" LY</p>"+
				"<p><span class='toolTip'>Temperature<span class='toolTipText'>Temperature in degrees Kelvin</span></span>: "+focusedStar["teff"]+" K</p>"+
				"<p><span class='toolTip'>Apparent Magnitude<span class='toolTipText'>Brightness as seen by an observer on Earth, the brighter an object appears, the lower the apparent magnitude</span></span>: "+focusedStar["mag"]+"</p>"+
				"<p><span class='toolTip'>Luminocity<span class='toolTipText'>Luminocity relative to the sun</span></span>: "+Math.round(Math.pow(focusedStar["radius"],2)*Math.pow((focusedStar["teff"]/5778),4)*100)/100+"</p>"+
				"<br>"+
				"<p>Double Click to Hide</p>"+
				"</div>").appendTo($("#popUpContainer"));
	popUpBox.css("background-color", $(this).find("path").css("fill"));
	if(focusedStar["mass"]!=0){
		popUpBox.prepend("<p><span class='toolTip'>Mass<span class='toolTipText'>Mass of star relative to the Sun</span></span>: "+focusedStar["mass"]+" Solar Masses</p>")
	}
	if(focusedStar["name"]!=""){
		popUpBox.prepend("<p><span class='toolTip'>Name<span class='toolTipText'>Common name for the star</span></span>: "+focusedStar["name"]+"</p>")
	}
	
	popUpBox.css({"top": parseInt($(this).css("top"))+(parseInt($(this).css("height"))/2)-(popUpBox.height()/2)-20,
					"left": parseInt($(this).css("left"))-popUpBox.width()-20});
	popUpBox.find(".toolTipText").each(function(){
		$(this).css({"left": parseInt(popUpBox.css("width"))+5, "background-color":popUpBox.css("background-color")});
	});
	
	oscillator.type = 'triangle'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
	oscillator.frequency.value = (1/focusedStar["radius"])*500; // value in hertz
	oscillator.connect(gainNode);
	gainNode.connect(audioCtx.destination);

	
});
$(document).on("dblclick", ".popUpBox", function(){
	$(this).remove();
});

Mousetrap.bind("c", function(){
	$(document).scrollTop((maxY*distanceScaler)-($(window).height()/2));
	$(document).scrollLeft((maxX*distanceScaler)-($(window).width()/2));
})

Mousetrap.bind("m", function(){
	isMuted=!isMuted;
	if(isMuted){
		gainNode.gain.value=0;
	}
	else{
		gainNode.gain.value=0.3;
	}
})

Mousetrap.bind("r", function(){
	randomStarNum=parseInt(Math.random()*numberOfStars);
	var starArray  = Object.keys(starCoordinateDict);
	var randomValue= starCoordinateDict[starArray[randomStarNum]];
	console.log(starArray[randomStarNum]);
	$(document).scrollLeft(randomValue[0]- parseInt($(window).width())/2);
	$(document).scrollTop(randomValue[1]- parseInt($(window).height())/2);
})