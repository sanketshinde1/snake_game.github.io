const playboard = document.querySelector(".play-board");
const scoreelement = document.querySelector(".score");
const highscoreelement = document.querySelector(".high-score");

let foodX , foodY ;
let snakeX = 5 , snakeY = 10;
let snakebody = [];
let velocityX = 0 , velocityY = 0;
let gameover = false;
let setIntervalId;
let score = 0;

let highscore = localStorage.getItem("high-score");
highscoreelement.innerText = `High score ${highscore}`;



let handlegameover = () => {
    clearInterval(setIntervalId);
    alert('Game Over !! Press OK to Replay...');
    location.reload();

}

const changeDirection = (e) => {
   //changing valocity value based on key press
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0; 
        velocityY = -1; 
    }
    else if(e.key === "ArrowDown"  && velocityY != -1){
        velocityX = 0; 
        velocityY = 1; 
    }
    else if(e.key === "ArrowLeft"  && velocityX != 1){
        velocityX = -1; 
        velocityY = 0; 
    }
    else if(e.key === "ArrowRight"  && velocityX != -1 ){
        velocityX = 1; 
        velocityY = 0; 
    }
    // initgame();
}

const changefoodposition = ()=>{
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
} 
const initgame = ()=>{

    if(gameover) return handlegameover();
    let htmlmarkup  = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
    if(snakeX === foodX && snakeY === foodY){
        changefoodposition();
        snakebody.push([foodX, foodY]);
        // console.log(snakebody);
        score++;
        highscore = score >= highscore ? score : highscore;
        localStorage.setItem("high-score",highscore);
        scoreelement.innerText = `score ${score}`;
        // highscoreelement.innerText = `High score ${highscore}`;
        
    }

    for(let i=snakebody.length -1; i>0 ;i--){
        //shifting forward the value of the element in the snake body by one 
        snakebody[i] = snakebody[i-1];
    }

    snakebody[0] = [snakeX , snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 )
    {
        console.log('Game over');
        gameover = true;
    }


    for(let i=0; i< snakebody.length; i++)
    {
        htmlmarkup  += `<div class="head" style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
        if(i !== 0 && snakebody[0][1] === snakebody[i][1] && snakebody[0][0] ===snakebody [i][0])
        {
            gameover = true;
        }
    }



    htmlmarkup  += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    playboard.innerHTML = htmlmarkup;
}
changefoodposition();
// initgame();
setIntervalId =  setInterval(initgame , 125);
document.addEventListener("keydown",changeDirection);