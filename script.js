
import {updateBird, setUPBird, gedBirtRect} from './birds.js'
import { updatePipe, setPipe,getCountPassedPipe, getPipeRects } from './pipe.js';
 

document.addEventListener("keypress", handleStart, {once: true})

const title = document.querySelector("[data-title]") 
const subTitle = document.querySelector("[data-subtitle]")
 
let lastTime;
function updateLoop(time) {
    if(lastTime == null) {
        lastTime = time; 
        window.requestAnimationFrame(updateLoop);
        return
    } 
    let delta = time - lastTime; 
    updateBird(delta);
    updatePipe(delta);
    if(checkLose()) return handleLose()
    lastTime = time; 
    window.requestAnimationFrame(updateLoop)
} 

function checkLose() {
    const birdRect = gedBirtRect();
    const insidePipe = getPipeRects().some(rect=> isCollision(birdRect, rect))
    const outSideWorld = birdRect.top < 0 || birdRect.bottom> window.innerHeight;
    return outSideWorld || insidePipe;
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right && 
        rect1.top < rect2.bottom && 
        rect1.right > rect2 .left &&
        rect1.bottom > rect2.top 
    )

}

function handleStart() { 
    title.classList.add("hide")
    setUPBird();
    setPipe();
    lastTime = null; 
    window.requestAnimationFrame(updateLoop)

}

function handleLose() {
    setTimeout(()=> {
        title.classList.remove("hide");
        subTitle.classList.remove("hide");
        subTitle.innerText = `${getCountPassedPipe()} Pipes Passed `
        document.addEventListener("keypress", handleStart, {once: true})
    },100)
  
}