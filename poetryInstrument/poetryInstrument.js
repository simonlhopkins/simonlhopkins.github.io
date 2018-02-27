var letsPlayAudio=document.getElementById("letsPlay");
var blackSkinHeadAudio=document.getElementById("blackSkinHead");
var flightTheNavigatorAudio=document.getElementById("flightTheNavigator");
var scatmanAudio=document.getElementById("scatman");
var friendsAudio=document.getElementById("friends");
var ifinkyoufreakyAudio=document.getElementById("ifinkyoufreaky");
var tartuAudio=document.getElementById("tartu");
var funkyPartyAudio=document.getElementById("funkyParty");
var gameOverAudio=document.getElementById("gameOver");
var outroAudio=document.getElementById("outro");

var fontSize=24

var isPlaying=true;
var timeIndex=0;
var timeList=[[0.65, "hey guys welcome to the first episode of sky does minecraft","https://media.giphy.com/media/uNtESYuFhf7c4/giphy.gif"],
				[3.59, "alright I have been getting a lot of uhh a lot of people telling me","https://media.giphy.com/media/sOVueselOTje8/giphy.gif"],
				[8.43, "hey sky you should uh you should do minecraft","https://media.giphy.com/media/7TNHjAg9PvKhi/giphy.gif"],
				[12.3, "so I did I bought it, so uh lets play","https://media.giphy.com/media/tF89BvcnxYvba/giphy.gif"],
				[16.9, "so Ive already started two worlds and Ive already started playing but you know thats no fun so lets make a new world just for this series","https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif"],
				[26.26, "and um yea so basically","https://media.giphy.com/media/5VKbvrjxpVJCM/giphy.gif"],
				[34.38, "basically the first thing that were going to want to do is um when this loads of course the first thing we're going to want to do is survive the night","https://media.giphy.com/media/3o7TKRAa4sQ4RaJo4g/giphy.gif"],
				[46.85, "go with that ok so wow this fuckin crappy ass","https://media.giphy.com/media/vHxFd97JIBBSw/giphy.gif"],
				[52.5,"fuck this shit","https://media.giphy.com/media/eFUjdFjIRQupa/giphy.gif"],
				[53.47, "what the fuck ok so I get the worst fuckin world possible","https://media.giphy.com/media/57DX612XYgQKI/giphy.gif"],
				[59.5,"um it seems like Im on like a desert","https://media.giphy.com/media/3o7TKtDXJ48AogQxBC/giphy.gif"],
				[62.39, "wasteland kinda thing","https://media.giphy.com/media/E1VkShA8oxXBC/giphy.gif"],
				[65.52, "um what Im going to want to do","http://media.giphy.com/media/Iosc95v7CmeA0/giphy.gif"],
				[69.15, "*bloop* ","https://media.giphy.com/media/HfTEk1GeE8dX2/giphy.gif"],
				[72.02, "for this is oh did you hear that that was my skype that just went off","https://media.giphy.com/media/wRCPtVwuhVG1i/giphy.gif"],
				[77.13, "the thing that Im going to want to do here","https://media.giphy.com/media/3ohzdNGUf7mevermJq/giphy.gif"],
				[80.76, "Is try to get a place to survive the night","https://media.giphy.com/media/4L69OKSHdCx7a/giphy.gif"],
				[85.84, "uh did I already hear a skeleton?","https://media.giphy.com/media/NbXws7ARqQ8RG/giphy.gif"],
				[90.8, "uh its a really bad pick for the first starting of a world","https://media.giphy.com/media/3o7buijTqhjxjbEqjK/giphy.gif"],
				[96.4, "perfect dirt","https://media.giphy.com/media/7g48X8D1Wo024/giphy.gif"],
				[100.45, "ew ew","https://media.giphy.com/media/xUPGcMbcyHU8Fesx2w/giphy.gif"],
				[101.83, "aw fuck... damn cactus","https://media.giphy.com/media/KJ56aXGH9RlBK/giphy.gif"],
				[106.79,"Im just collecting some cactus you know, I have to work quickly because I have only like a certain amount of day","https://media.giphy.com/media/LVsmysvGBiZEs/giphy.gif"],
				[115.56, "you see the sun, is going to go all the way over here, to here...so","https://media.giphy.com/media/GDUs4GUZoCUec/giphy.gif"],
				[123.73,"*baah* you dont want to be out here when its dark because there is going to be a lot of","https://media.giphy.com/media/14nwNM6Ee4csPm/giphy.gif"],
				[130.1,"bad creatures out here that are probably going to kill me","https://media.giphy.com/media/l3vR9kYGugvav8R8c/giphy.gif"],
				[133.8, "sooooooo, for now lets just make a little... we want to start out by just getting some wood","https://media.giphy.com/media/XdnarqmkFhCKY/giphy.gif"],
				[142.45, "huh getting wood hahahaha","https://media.giphy.com/media/26tnozFQCnFBQEHhm/giphy.gif"],
				[146.96, "this is a tree","https://media.giphy.com/media/LMapnzWPCK3yE/giphy.gif"],
				[152.95, "ew thats very loud, Im going to change the settings on this","https://media.giphy.com/media/xqU08L2IE91y8/giphy.gif"],
				[156, ""]]

var replacements={ "sky does minecraft":"I try a poem",
				"people telling me":"People like to hear themselves talk",
				"you should do minecraft":"You should try listening",
				"lets play": "Listen to what Im saying",
				"Ive already started two worlds ":"Ive kept to myself ",
				"Ive already started playing ":"Ive been here for a bit ",
				"lets make a new world ": "Ill make an effort ",
				"yea":"yea!",
				"the first thing":"the first thing? ",
				"survive the night":"realize that everything isnt always so funny",
				"crappy ass":"CRAPPY ASS!!",
				"this shit": "ME!!!",
				"what the fuck":"WHAT THE FUCK???!!!!",
				"Im on like a desert": "Im always trying to impress other people",
				"kinda":"kinda...",
				"um what":"ummmm",
				"my skype": "my stupid android phone",
				"Im going to want to do here": "Im trying to say",
				"try to ": "try to ",
				"did I already hear a skeleton":"did I already say that",
				"a really bad pick":"a really bad poem",
				"dirt":"dirt",
				" ew":" lmao",
				"aw fuck":"AW FUCK!",
				"collecting some cactus":"trying to impress myself",
				"the sun is going": "the honeys are going",
				"you dont want to be out here":"you dont want to stop laughing",
				"bad creatures out here":"the creatures around me ",
				"kill me": "help me",
				"a little": "a funny",
				" wood ":" joke ",
				"hahahaha":"HAHAHAHA",
				"a tree":"finished",
				"Im going to change":"Im going to change :)"



				}
var currentTimeStep=0;
var currentPhrase="";
$(document).ready(function(){
	//letsPlayAudio.play();

	$("#poemContainer").css({"font-size": fontSize+"px"})
	$("img").each(function(){
		if(this.src==="https://cloud.githubusercontent.com/assets/23024110/20663010/9968df22-b55e-11e6-941d-edbc894c2b78.png"){
			this.remove();
		}
	});


});





$(document).on("keypress", function(){
	$(document).scrollTop($("#poemContainer").height()-500);
})
Mousetrap.bind("command+shift+k", function(){
	//0 secs
	$("#gifContainer").empty();
	$("#poemContainer").empty();
	
});
Mousetrap.bind("-", function(){
	//0 secs
	fontSize-=4;
	$("#poemContainer").css({"font-size": fontSize+"px"});
	
});
Mousetrap.bind("=", function(){
	//0 secs
	fontSize+=4;
	$("#poemContainer").css({"font-size": fontSize+"px"});
});
Mousetrap.bind("1", function(){
	//0 secs
	togglePlay(blackSkinHeadAudio);
	
});
Mousetrap.bind("2", function(){
	//0 secs
	togglePlay(flightTheNavigatorAudio);
});
Mousetrap.bind("3", function(){
	//0 secs
	togglePlay(scatmanAudio);
});
Mousetrap.bind("4", function(){
	//0 secs
	togglePlay(tartuAudio);
});
Mousetrap.bind("5", function(){
	//0 secs
	togglePlay(friendsAudio);
});
Mousetrap.bind("6", function(){
	//0 secs
	togglePlay(ifinkyoufreakyAudio);
});
Mousetrap.bind("7", function(){
	//0 secs
	togglePlay(funkyPartyAudio);
});
Mousetrap.bind("8", function(){
	//0 secs
	togglePlay(gameOverAudio);
});
Mousetrap.bind("9", function(){
	//0 secs
	togglePlay(outroAudio);
});
Mousetrap.bind("q", function(){
	//0 secs
	setText(0);
	
});
Mousetrap.bind("w", function(){
	//3.3 secs
	setText(1);
});
Mousetrap.bind("e", function(){
	//8.45 secs
	setText(2);
});
Mousetrap.bind("r", function(){
	//12.3 secs
	setText(3);
});
Mousetrap.bind("t", function(){
	//16.83 secs
	setText(4);
});
Mousetrap.bind("y", function(){
	//26.26 secs
	setText(5);
});
Mousetrap.bind("u", function(){
	//32.81 secs
	setText(6);
});
Mousetrap.bind("i", function(){
	//46.27 secs
	setText(7);
});
Mousetrap.bind("o", function(){
	//52.45 secs
	setText(8);
});
Mousetrap.bind("p", function(){
	//53.68 secs
	setText(9);
});
Mousetrap.bind("[", function(){
	//58.68 secs
	setText(10);
});
Mousetrap.bind("]", function(){
	//58.68 secs
	setText(11);
});
Mousetrap.bind("\\", function(){
	//58.68 secs
	setText(12);
});
Mousetrap.bind("a", function(){
	//58.68 secs
	setText(13);
});
Mousetrap.bind("s", function(){
	//58.68 secs
	setText(14);
});
Mousetrap.bind("d", function(){
	//58.68 secs
	setText(15);
});
Mousetrap.bind("f", function(){
	//58.68 secs
	setText(16);
});
Mousetrap.bind("g", function(){
	//58.68 secs
	setText(17);
});
Mousetrap.bind("h", function(){
	//58.68 secs
	setText(18);
});
Mousetrap.bind("j", function(){
	//58.68 secs
	setText(19);
});
Mousetrap.bind("k", function(){
	//58.68 secs
	setText(20);
});
Mousetrap.bind("l", function(){
	//58.68 secs
	setText(21);
});
Mousetrap.bind(";", function(){
	//58.68 secs
	setText(22);
});
Mousetrap.bind("'", function(){
	//58.68 secs
	setText(23);
});
Mousetrap.bind("z", function(){
	//58.68 secs
	setText(24);
});
Mousetrap.bind("x", function(){
	//58.68 secs
	setText(25);
});
Mousetrap.bind("c", function(){
	//58.68 secs
	setText(26);
});
Mousetrap.bind("v", function(){
	//58.68 secs
	setText(27);
});
Mousetrap.bind("b", function(){
	//58.68 secs
	setText(28);
});
Mousetrap.bind("n", function(){
	//58.68 secs
	setText(29);
});
Mousetrap.bind("<", function(){
	//58.68 secs
	if($(".song").prop("volume")>0.02){
		$(".song").prop("volume",$(".song").prop("volume")-0.02);
	}
});
Mousetrap.bind(">", function(){
	//58.68 secs
	if($(".song").prop("volume")<0.95){
		$(".song").prop("volume",$(".song").prop("volume")+0.02);
	}
});




var replacePhase= function(phrase){
	//phraseList=phrase.split(" ");
	var newPhrase=phrase.text();
	for(var key in replacements){
		if(newPhrase.includes(key)){
			newPhrase=newPhrase.replace(key, "</span><span class='replacementWord'>"+replacements[key]+"</span><span id='regularText'>");
		}
	}
	return newPhrase;
}
var setText=function(i){

	
	currentTimeStep=i;
	if(timeList[currentTimeStep].length>2){
		placeImage(timeList[currentTimeStep][2])
	}
	letsPlayAudio.volume=1;
	letsPlayAudio.play();
	currentPhrase=timeList[i][1];
	currentTime=timeList[i][0];
	letsPlayAudio.currentTime=currentTime;
	//$("#poemContainer").append("<p id='poemText'><span id='regularText'>"+currentPhrase+"</span></p>");
	//$("p").fadeOut((timeList[i+1][0]-timeList[i][0])*1000);
	var newElement = $("<p class='poemText'><span id='regularText'>"+currentPhrase+"</span></p>").appendTo("#poemContainer")

	setTimeout(function(element){
		newPhrase= replacePhase(newElement);
		newElement.html(function(){
			return "<span id='regularText'>"+newPhrase+"</span>";
		});
		newElement.find(("#regularText")).fadeOut(((timeList[currentTimeStep+1][0]-timeList[currentTimeStep][0])/2)*1000);
		newElement.find(".replacementWord").hide();
		newElement.find(".replacementWord").fadeIn(1000);
		newElement.find(".replacementWord").draggable();
	},((timeList[currentTimeStep+1][0]-timeList[currentTimeStep][0])/2)*1000);
	
}

var togglePlay=function(song){
	$(".song").prop("volume",0.15);
	if(song.paused){
		song.play();
	}else{
		song.pause();
	}
}

var placeImage=function(image){

	var $image= $("<img id='gif' src="+image+"></img>").appendTo($("#gifContainer"));
	$image.css({"top": Math.floor(Math.random() * (($(document).height()-$image.height()) - $(window).scrollTop() + 1)) + $(window).scrollTop()+"px", 
		"left":Math.floor(Math.random() * ($(window).width()-$image.width()))+"px"});
}
$(document).on("mouseenter", ".poemText", function(){
 	//$(this).effect("bounce", {times:1},"fast");
});

letsPlayAudio.addEventListener("timeupdate", function(){
		if(letsPlayAudio.currentTime>timeList[currentTimeStep+1][0]){
			letsPlayAudio.pause();
			return;
		}
	})



