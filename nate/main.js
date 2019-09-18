
var socket = io.connect("https://159.89.54.178:433",  { secure: true, reconnect: true, rejectUnauthorized : false });

//local data structures that ONLY need to exist locally

var cardSearchAreaDict = [];


//all socket.on events ------------------------
socket.on("requestCardData", function(data){
	loadCardsToSearchArea(data);
	
	
});

//sends the Game on the sever to the client, this is where all the UI update handleing should happen
//basically through the requestGameJSON event, that triggers waiting for the getGameJSON event, which
//returns the game.json on the server. We then call the updateGame event which emits to ALL users. which
//updates the UI of the webpage of ALL users
socket.on("updateGame", function(_game){

	updateUI(_game);
	console.log("updated game:");
	//console.log(_game)
});


//----------------------------------------------

$(document).ready(function(){

	handleCardSearch();
	handleNicknameChange();
	handleDragCardFromSearchArea();


});



function handleCardSearch(){
	
	$('#searchArea').find("input").bind("enterKey",function(e){
		
		cardName = $(this).val();
		if(cardName === ""){
			return;
		}
		cardData = {
			"name": cardName,
			"setName": "Unlimited Edition"
		};
   		queryMTGAPI(cardData);

	});

	$('#searchArea').find("input").keyup(function(e){
	    if(e.keyCode == 13)
	    {
	        $(this).trigger("enterKey");
	    }
	});
	$('#searchArea').find("input").keydown(function(e){
	    if(e.keyCode == 13)
	    {
	        $('#searchAreaImgLoadArea').empty();
	        cardSearchAreaDict = [];
	    }
	});
}

function handleNicknameChange(){

	$('#becomeUserArea').find("input").keyup(function(e){
	    if(e.keyCode == 13)
	    {
	        $(this).trigger("enterKey");
	    }
	});

	$('#becomeUserArea').find("input").bind("enterKey",function(e){
		var newName = $('#becomeUserArea').find("input").val();
		console.log("enter pressed");
		requestGameJSON();
		socket.on("getGameJSON", function(_gameJSON){
			var gameJSON = _gameJSON;
			try{
				if(gameJSON.boardState.sideA.user.socketID === socket.id){
					console.log("setting new nickname of A...")
					gameJSON.boardState.sideA.user.nickname = newName;
				}
				else if(gameJSON.boardState.sideB.user.socketID === socket.id){
					console.log("setting new nickname of B...")
					gameJSON.boardState.sideB.user.nickname = newName;
				}
			}catch(err){
				console.log("cannot set value of gameJSON");
				console.log("\t"+err);
			}
			
			socket.emit("updateGame", gameJSON);
		});
		

	});
}


function queryMTGAPI(cardData){
	socket.emit("requestCardData", cardData);
}

function updateUI(_game){
	updateUserUI(_game);
	updateCreaturePermanentUI(_game);
}

function updateUserUI(gameJSON){
	userUItext = "socket ID = " + socket.id + "\n";
	userUItext += "Side A: " + gameJSON.boardState.sideA.user.nickname + "(" + gameJSON.boardState.sideA.user.socketID + ")";

	userUItext += "Side B: " + gameJSON.boardState.sideB.user.nickname + "(" + gameJSON.boardState.sideB.user.socketID + ")";


	$("#becomeUserArea").find("p").text(userUItext);

}

function updateCreaturePermanentUI(_game){

	//this is kinda lazy lol but it works
	$(".user").empty();
	$(".opponent").empty();
	if(_game.boardState.sideA.user.socketID === socket.id){
		console.log("adding cards to sideA");
		for(var i = 0; i< _game.boardState.sideA.creaturePermanents.length; i++){
			$(".user").append("<p>"+_game.boardState.sideA.creaturePermanents[i].name+"</p>");
		}
		for(var i = 0; i< _game.boardState.sideB.creaturePermanents.length; i++){
			$(".opponent").append("<p>"+_game.boardState.sideB.creaturePermanents[i].name+"</p>");
		}
	}
	else if(_game.boardState.sideB.user.socketID === socket.id){
		console.log("adding cards to sideB");
		for(var i = 0; i< _game.boardState.sideB.creaturePermanents.length; i++){
			$(".user").append("<p>"+_game.boardState.sideB.creaturePermanents[i].name+"</p>");
		}
		for(var i = 0; i< _game.boardState.sideA.creaturePermanents.length; i++){
			$(".opponent").append("<p>"+_game.boardState.sideA.creaturePermanents[i].name+"</p>");
		}
	}

}


//modifies the game on the server to then be sent out to the client.
function requestGameJSON(){
	socket.emit("requestGameJSON");
}

//this should be handles better lol
var recentCardClicked;

function handleDragCardFromSearchArea(){

	// $(".searchAreaCard").click(function(){
	// 	console.log("clicked");
	// 	console.log($(this).attr('id'));
	// });
	$(document).on("click", ".searchAreaCard", function(){
		console.log("click event...");
		console.log($(this).attr("id"));
		requestGameJSON();
		for(var i = 0; i<cardSearchAreaDict.length; i++){
			console.log(i);
			if(cardSearchAreaDict[i].id == $(this).attr("id")){
				
				recentCardClicked = cardSearchAreaDict[i].card;

			}
		}

	});

	socket.on("getGameJSON", function(_game){

		console.log("getting json inside of click event");
		var game = _game;
		//make this a fucking fuction. yea but like I need to streamline this process
		if(game.boardState.sideA.user.socketID === socket.id){
			//sideA
			try{				
				game.boardState.sideA.creaturePermanents.push(recentCardClicked);
			}
			catch(err){

			}
		}
		else if(game.boardState.sideB.user.socketID === socket.id){
			//sideB
			try{
				game.boardState.sideB.creaturePermanents.push(recentCardClicked);
			}
			catch(err){
				
			}
		}

		console.log(_game);

		socket.emit("updateGame", game);
	});
}


function loadCardsToSearchArea(data){
	$('#searchAreaImgLoadArea').append("<img class = 'searchAreaCard' id = '"+data.id+"' src = '"+data.imageUrl+"'>");

	var cardID = data.id;
	cardSearchAreaDict.push({
								id: data.id,
								card: data
							});

}

//returns a side
function getSide(_game){
	try{
		if(_game.boardState.sideA.user.socketID === socket.id){
			return _game.boardState.sideA;
		}
		else if(_game.boardState.sideB.user.socketID === socket.id){
			return _game.boardState.sideB;
		}
		else{
			console.log("socket ID does not match any of the current users");
			return null;
		}
	}catch(err){
		console.log(not)
	}
}

//handle getting card data if you click on it












