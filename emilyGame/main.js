
var mousePosLastFrameX = 0;
var mousePosLastFrameY = 0;
var score= 0;
var scoreString = ""
$(document).ready(function(){



  $( document ).on( "mousemove", function( event ) {
    dist = Math.sqrt( Math.pow((event.pageX-mousePosLastFrameX), 2) + Math.pow((event.pageY-mousePosLastFrameY), 2) );

    score+=dist

    loops = parseInt(score/1000)
    scoreString =""
    for(var i= 0; i<loops;i++){
      scoreString +="x"
    }
    if(loops >=10){
      $( "#loading" ).text("nice")
    }else{
      $( "#loading" ).text(scoreString)
    }

    mousePosLastFrameX = event.pageX
    mousePosLastFrameY = event.pageY
  });

});
