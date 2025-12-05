import { questions } from "./questions.js"

const startGame = document.getElementById("Start-Btn-Id");
const startScreen = document.getElementById("main-container-screen");
const gameScreen = document.getElementById("game-screen");
const questionContainer = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const answersList = document.getElementById("answersList");
const rewardList = document.getElementById("rewards-list");
const endScreen = document.getElementById("end-screen");
const endScreenMessage = document.getElementById("end-screen-message");
const playAgainBtn = document.getElementById("Play-Again-Btn");
const tryAgainScreen = document.getElementById("wrong-answer-screen");
const tryAgainBtn = document.getElementById("try-again");


let username = "";
let score = 0;
let rewards = [100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000];
let reward = 0;
let defaultQuestionNo = 0;


/*-- =====================================================================
                          GAME START SECTION
======================================================================== */

startGame.addEventListener("click", function(){
    startScreen.style.display = "none"
    gameScreen.style.display = "flex"
    
    username = prompt("Please enter your name");
    loadQuestion();
}
)

playAgainBtn.addEventListener("click", function(){
    startScreen.style.display = "flex"
    endScreen.style.display = "none"
    score = 0;
    defaultQuestionNo = 0;
    reward = 0
    rewardList.firstElementChild.style.backgroundColor = "";
    rewardList.firstElementChild.style.border = "";
    console.log(score)
})

tryAgainBtn.addEventListener("click", function(){
    let rewardLength = rewardList.children.length;
    tryAgainScreen.style.display = "none"
    startScreen.style.display = "flex"
    rewardList.children[rewardLength - score].style.backgroundColor = "";
    rewardList.children[rewardLength - score].style.border = "";
    score = 0;
    reward = 0;
    defaultQuestionNo = 0;
    
})



function loadQuestion(){

answersList.innerHTML = "";

if(questions[defaultQuestionNo] === undefined){
    gameScreen.style.display = "none";
    endScreen.style.display = "block"
    endScreenMessage.textContent = `Congratulations ${username}, You are a millionaire!`
    return;
}

questionContainer.textContent = questions[defaultQuestionNo].question;


questions[defaultQuestionNo].choices.forEach((option) => {
    
    let answerOption = document.createElement("li"); // creating new element with js
    answerOption.textContent = option
    
    answersList.appendChild(answerOption); // answersList (ul) > li
   
    answerOption.addEventListener("click", function(){
       
        if(answerOption.textContent === questions[defaultQuestionNo].correct){
            console.log("That a correct answer")

            defaultQuestionNo++;
            score++;
            moneyLadder();
            loadQuestion(); 
        } else {
            calculateReward();
            gameScreen.style.display = "none";
            tryAgainScreen.style.display = "block"

            if(reward == 0){
                tryAgainScreen.firstElementChild.textContent = `Unfortunately.. that is not the correct answer`
            }else{
                tryAgainScreen.firstElementChild.textContent = `Congratulation ${username}, you have won ${reward}`
            }
        }
    })
});
}

function calculateReward(){
    
    for(let i = 0;i < score; i++){
        reward = rewards[i];
        console.log(reward);
    }
}


function moneyLadder () {
    let rewardLength = rewardList.children.length;
    let moneyLadderElement = rewardList.children[rewardLength - score];
    
    moneyLadderElement.style.backgroundColor = "rgba(5, 160, 85, 1)";
    moneyLadderElement.style.borderRadius = "50px"
    moneyLadderElement.style.listStyle = "none"
    moneyLadderElement.style.transition = "all 1s ease";

    if(moneyLadderElement.nextElementSibling === null){
        return;
    } else{
        moneyLadderElement.nextElementSibling.style.backgroundColor = "";
        moneyLadderElement.nextElementSibling.style.border ="";

    }

}

