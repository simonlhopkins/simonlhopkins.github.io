

$(document).ready(function(){
    
    var styleNode = document.createElement ("style");
    styleNode.type = "text/css";
    styleNode.textContent = "@font-face { font-family: destroy; src: url('"
                            + chrome.extension.getURL ("images/Destroy.ttf")
                            + "'); }";
    document.head.appendChild (styleNode);
    setTimeout(createGraffitiGif,2000);
    setTimeout(createBaseballGif,4000);
    setTimeout(createThrowGif,8000);
    setTimeout(createHammerGif,12000);
    

    
    

});


function getArea(img){
    return (img.clientWidth*img.clientHeight);
};

function compareSize(image1, image2){
    return(getArea(image2)-getArea(image1));
}
function getImageList(){
    var images= document.getElementsByTagName('img');
    if(images.length==0){
        return;
    }


    images=Array.from(images);
    var largestImage= images[0];
    var largestImageArea= getArea(largestImage);
    
    var sortedImageList=images.sort(compareSize);
    return(sortedImageList);
}
function createBaseballGif(){
    
    var baseballURL=chrome.extension.getURL("images/baseballHit.gif");
    var baseBallContainer=document.createElement("div");
    baseBallContainer.id="baseBallContainer";
    $("body").append(baseBallContainer);

    var allHyperLinkList=Array.from(document.getElementsByTagName("a"));
    var selectedHyperLinkList=[];
    for(var i=0; i<allHyperLinkList.length;i++){
        if($(allHyperLinkList[i]).text().length>2 && $(allHyperLinkList[i]).offset().left>0 && $(allHyperLinkList[i])[0]["innerText"]!=""
            && $(allHyperLinkList[i]).children().length<2){
            selectedHyperLinkList.push(allHyperLinkList[i]);
        }

    }
    var numOfBaseballMen= parseInt(10+(selectedHyperLinkList.length/10)*((-1/(selectedHyperLinkList.length+1))+1));
    var numSpawned=0
    for(var i=0; i<=selectedHyperLinkList.length;i++){

        if(numSpawned>=numOfBaseballMen){
            continue;
        }
        if(selectedHyperLinkList.length>10){
            var randomNum=Math.random();
             if(randomNum<0.9){
                 continue;
            }
        }
        
        numSpawned+=1;
        baseBallGif=document.createElement('img');
        baseBallGif.src=baseballURL
        baseBallGif.id="baseBallGif"
        $(selectedHyperLinkList[i]).css("z-index", 9999);
        $(baseBallGif).copyCSS($(selectedHyperLinkList[i]), ["margin"]);
        $(baseBallGif).css({"position":"absolute",
                            "height": 150+"px",
                            "width": "auto",
                            "top": $(selectedHyperLinkList[i]).position().top-88,
                            "left": $(selectedHyperLinkList[i]).position().left-140+($(selectedHyperLinkList[i]).outerWidth()/2),
                            "max-width": "none",
                            "z-index":5000});
        $(selectedHyperLinkList[i]).delay(3200).queue(function(){ 
            $(this).css({'text-decoration': 'line-through',
                        "font-family":"destroy"});
            
        });
        
        $(selectedHyperLinkList[i]).parent().append(baseBallGif);
    }

    
}

function createHammerGif(){
    var hammerURL=chrome.extension.getURL("images/hammer.gif");
    var hammerContainer=document.createElement("div");
    hammerContainer.id="hammerContainer";
    $("body").append(hammerContainer);
    var h1List=Array.from(document.getElementsByTagName("h1"));
    var h2List=Array.from(document.getElementsByTagName("h2"));
    var h3List=Array.from(document.getElementsByTagName("h3"));
    var allHeaders=h1List.concat(h2List, h3List);
    var selectedHeaders=[];
    for(var i=0; i<allHeaders.length;i++){
        if(allHeaders.length>10){
            var randomNum=Math.random();
            if(randomNum>0.5){
                selectedHeaders.push(allHeaders[i]);
            }
        }
        else{
            selectedHeaders=allHeaders;
        }
    } 
    for(var i=0; i<selectedHeaders.length;i++){

        
        var hammerGif= document.createElement('img');
        hammerGif.src=hammerURL;

        hammerGif.class="hammerGif";

        $(hammerGif).css({"width": 95,
                        "height": "auto",
                        "top": $(selectedHeaders[i]).offset().top-110,
                        "left": $(selectedHeaders[i]).offset().left,
                        "z-index":5000,
                        "position": "absolute",
                        "max-width":"none"});


        $(hammerContainer).append(hammerGif);
        
    }
    var counter=0;
    setInterval(function(){
        counter+=1

        for(var i=0; i<selectedHeaders.length;i++){
            $(selectedHeaders[i]).css("opacity", "-=0.1");
            $(selectedHeaders[i]).css("font-family", "destroy");
            // $(allHeaders[i]).effect("bounce", "slow");
        }
        if(counter==10){
            $("#hammerContainer").fadeOut("slow");
        }
    },2200);
}


function createThrowGif(){
    
    var throwGifURL=chrome.extension.getURL("images/walkAndThrow.gif");
    var explosionFireURL= chrome.extension.getURL("images/fireExplosion.gif");
    var throwAnimContainer= document.createElement("div");
    throwAnimContainer.id="throwAnimContainer";
    document.body.appendChild(throwAnimContainer);
    for(var i=0; i<20; i++){
        var randomX=Math.random()*($(window).width()-500);
        var randomY= Math.random()*($(document).height()-90);
        var throwGif= document.createElement('img');
        var explosionFireImg=document.createElement('img');
        throwGif.src=throwGifURL;
        throwGif.id="throwGif";
        explosionFireImg.src=explosionFireURL;
        explosionFireImg.id="explosionFire";
        $(explosionFireImg).css({"width": 100,
                                "height":"auto"});
        $(throwGif).css({"width": 500,
                        "height":"auto"});
        $(throwGif).css({"top": randomY,
                        "left": randomX,
                        "max-width":"none"});
        $(explosionFireImg).css({"top": randomY+ 127 - 107,
                                "left": randomX+ 455- 50,
                                "position":"absolute",
                                "max-width": "none"})
        
        $("body").append(explosionFireImg);
        $(explosionFireImg).hide().delay(5400).fadeIn(500);

        //$(textSortedByFontSize[i]).delay(6000).css("background-color", "red");
        throwAnimContainer.appendChild(throwGif);
    }
    setTimeout(function(){
        $("#throwAnimContainer").empty();
    },8000)
    
    
    
    
}
function createGraffitiGif(){
    var animContainerDiv= document.createElement('div');
    var graffitiContainerDiv= document.createElement('div');
    animContainerDiv.id="animContainerDiv";
    document.body.appendChild(animContainerDiv);
    graffitiContainerDiv.id="graffitiContainerDiv";
    document.body.appendChild(graffitiContainerDiv);
    var sortedImages=getImageList();
    var sprayPaintSoundURL=chrome.extension.getURL("images/sprayCanSound.wav");
    var graffitiPicURL=chrome.extension.getURL("images/walkAndGraffiti.gif");
    var graffitiXURL=chrome.extension.getURL("images/graffitiX.png");
    //creates the container for the animations and sounds
    
    //gets all images on page
    
    //creates images and sounds to populate the animation div
    if(sortedImages==undefined){
        return;
    }
    for(var i=0; i<sortedImages.length; i++){
        // var randomNum=Math.random();
        // if(randomNum<=0.5){
        //     continue;
        // }

        if(getArea(sortedImages[i])<577){
            continue;
        }
        var sprayCanSound= document.createElement('AUDIO');
        var graffitiPic= document.createElement('img');
        var graffitiXPic= document.createElement('img');
        sprayCanSound.src=sprayPaintSoundURL;
        
        graffitiXPic.id="graffitiXPic";
        graffitiPic.id="graffitiPic";
        var offset=(1.58*$(sortedImages[i]).height())-($(sortedImages[i]).width()/2);
        $(graffitiPic).css({"top": $(sortedImages[i]).offset().top,
                            "left": $(sortedImages[i]).offset().left-offset})
        $(graffitiXPic).css({"top": -50+"px",
                        // "left": $(sortedImages[i]).offset().left,
                        "z-index": 1000,
                        "max-width":"none"})
        
        graffitiPic.src=graffitiPicURL;
        graffitiXPic.src=graffitiXURL;

        var graffitiXAdded= $(graffitiXPic).appendTo($(sortedImages[i]).parent());
        $(graffitiXAdded).copyCSS($(sortedImages[i]), ["margin"]);
        $(graffitiXAdded).css({"position":"absolute",
                                "top": $(sortedImages[i]).position().top,
                               "left": $(sortedImages[i]).position().left});
        var animAdded= $(graffitiPic).appendTo($(animContainerDiv));

        $(graffitiXAdded).height($(sortedImages[i]).height()+"px");
        $(graffitiXAdded).width($(sortedImages[i]).width()+"px");
        $(animAdded).height($(sortedImages[i]).height()+"px");

        
    
        animContainerDiv.appendChild(sprayCanSound);
        //$(sortedImages[i]).parent().append(graffitiXPic);
        

        $(graffitiXPic).hide().delay(2000).fadeIn(5000);
        
        
        setTimeout(function(){
            $("#animContainerDiv").empty();
        },8000)
        
        
    }
    setTimeout(function(){
            sprayCanSound.play()
            
    }, 2000);
    
    
    

}