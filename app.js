let body=document.querySelector("body");
let h3= document.querySelector("h3");
let gameSeq =[];
let userSeq = [];
let score=0;
let HighestScore=0;

let btns=["yellow","red","purple","green"];

let started = false;
let level=0;

function gameFlash(btn){
    btn.classList.add("flash");
    console.log(btn.classList);
    setTimeout(function (){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    console.log(btn.classList);
    setTimeout(function (){
        btn.classList.remove("userflash");
    },250);
}


function levelup(){
    userSeq=[];
    level++;
    score=level;
    h3.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*3);
    let randCol=btns[randIdx];
    let randBtn=document.querySelector(`.${randCol}`);
    gameSeq.push(randCol);
    console.log(gameSeq);
    gameFlash(randBtn);
}

document.addEventListener("keypress",function (){
    if(started==false){
    started=true;
    levelup();
    
    console.log(h3);
    }
});

function checkAns(idx){
    console.log(`current level : ${level}`);
    // let idx=level-1;
    if(userSeq[idx]===gameSeq[idx]){
        console.log("Same value");
        if(userSeq.length===gameSeq.length){
            setTimeout(levelup,1000);
        }
    }
    else{
        HighestScore=score;
        document.querySelector("h4").classList.remove('no');
        document.querySelector("h4").innerText=`Highest Score = ${HighestScore}`;
        body.classList.add("back");
        setTimeout(()=>{
            body.classList.remove("back");
        },100);
        h3.innerHTML=`Game Over! Your Score was <b>${score}</b> <br> Press any key to start.`;
        resetGame();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);
    userCol=btn.getAttribute("id");
    console.log(userCol);
    userSeq.push(userCol);
    checkAns(userSeq.length-1);
}

let allBtns= document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function resetGame(){

    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}