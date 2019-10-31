$(document).ready(function(){

   $(".mary").click(function(){
      var elem = this;
      elem.src = "./images/munch.gif";
      setTimeout(function(){

         elem.src = "./images/idle.gif";
      }, 1730);
   });


});
