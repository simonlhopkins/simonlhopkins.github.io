var canclick = true;
$(document).ready(function(){

   $(".mary").click(function(){
      if(!canclick){
         return;
      }
      var elem = this;
      elem.src = "./images/munch.gif";
      canclick = false
      setTimeout(function(){
         canclick = true;
         elem.src = "./images/idle.gif";
      }, 1730);
   });


});
