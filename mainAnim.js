var idle = new Image();
idle.src = "./mainPageGifs/idleDesk.gif";
var drink = new Image();
drink.src = "./mainPageGifs/openDrinkDesk.gif";

var pbrIdle = new Image();
pbrIdle.src = "./mainPageGifs/pbrIdle.gif";
var pbrDrink = new Image();
pbrDrink.src = "./mainPageGifs/pbrDrink.gif";

var coffeeIdle = new Image();
coffeeIdle.src = "./mainPageGifs/coffeeIdle.gif";
var coffeeDrink = new Image();
coffeeDrink.src = "./mainPageGifs/coffeeDrink.gif";

var isAnimating = false;
var COLORS = [

   "#0B3954",
   "#BFD7EA",
   "FF5A5F",
   "#C81D25",
   "#6A0136",
   "#BFAB25",
   "#B81365",
   "#C81D25",
   "#950952",
   "#5E0035",
   "#020202",
   "#023618",
   "#A3B4A2",
   "#CDC6AE",
   "#38686A",
   "#2589BD",
   "#4E8098",
   "#90C2E7",
   "#00A9A5",
   "#092327"

]

$(document).ready(function(){


   $("#linkContainer a").each(function(){
      $(this).html($(this).html().replace(/\S/g, "<span class='letter'>$&</span>"));

   });

   $("#linkContainer a").mouseover(function(){
      console.log("hovered");


      if(isAnimating){
         return;
      }
      var delay = 0;
      var newRandomColor = COLORS[Math.floor(Math.random()*COLORS.length)];
      $(this).children(".letter").each(function(){

         var assocLetter = $(this);
         setTimeout(function(){
            assocLetter.css(
               {
                  "font-weight": "900",
                  "color": newRandomColor
               });
            setTimeout(function(){
               assocLetter.css("font-weight", "normal");
            }, 500);
         }, delay);
         delay+=100;
      });
      isAnimating = true;
      var hoveredId = $(this);
      console.log(hoveredId.text());
      if(hoveredId.text() == "miscellaneous"){
         $("#drink").attr('src', pbrDrink.src);
      }else{
         $("#drink").attr('src', coffeeDrink.src);
      }
      $("#idleDesk").attr('src', drink.src);



      setTimeout(function(){
         isAnimating = false;
         $("#idleDesk").attr('src', idle.src);
         if(hoveredId.text() == "miscellaneous"){
            $("#drink").attr('src', pbrIdle.src);
         }else{
            $("#drink").attr('src', coffeeIdle.src);
         }
      }, 3150);
   });
});
