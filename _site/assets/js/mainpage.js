const Mainpage = {}

const elem = new Letterize({targets: "#mainTitle"});
Mainpage.MakeTypeWritter = function(){
    let appearTimeLine = anime.timeline({
        easing: 'linear',
        duration: 100,
        autoplay: true,
        complete: (anim)=>{
            setTimeout(Mainpage.MakeTypeWritter, 1000);
        }
    });
    elem.listAll.forEach((el, i) => {
        appearTimeLine.add({
            targets: el,
            opacity: [0,1], 
            round: 1
        }, Math.random() * 800);
    });
}

// Mainpage.MakeTypeWritter();

