const birdElem = document.querySelector("[data-bird]") 
const BIRD_SPEED = 0.4 ;
const JUMP_DURATION = 125; 
let timeSinceLastJump = Number.POSITIVE_INFINITY

export function updateBird(delta) {
    if(timeSinceLastJump < JUMP_DURATION ) {
        setTop(getTop() - BIRD_SPEED*delta)
    }
    else {
        setTop(getTop() + BIRD_SPEED*delta);
    }
    timeSinceLastJump += delta; 
}

export function setUPBird() {
    setTop(window.innerHeight/2)
    document.removeEventListener("keydown", handleJump);
    document.addEventListener("keydown", handleJump);
   
}

export function gedBirtRect() {
    return birdElem.getBoundingClientRect()
}


function handleJump(e) {
    
    if(e.code !== "Space")  {
        return;
    }
    timeSinceLastJump = 0

}
 

function getTop() {
console.log(parseFloat(getComputedStyle(birdElem).getPropertyValue("--bird_top")))
return parseFloat(getComputedStyle(birdElem).getPropertyValue("--bird_top"));
}

function setTop(top) {
   birdElem.style.setProperty("--bird_top",top);
}