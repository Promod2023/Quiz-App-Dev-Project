const frontPage = document.querySelector(".frontPage");
const start = document.querySelector(".frontPage .exitStart .start");
const rulesBox = document.querySelector(".rulesBox");
const exit = document.querySelector(".rulesBox .exitContinue .exit");
const Continue = document.querySelector(".rulesBox .exitContinue .continue");
const questionBox = document.querySelector(".questionBox");
const timeCount = document.querySelector(".timeCount .seconds");
const timeLine = document.querySelector(".questionBox .questionBoxHeader .timeLines");
const restartBtn = document.querySelector(".restartQuitBtn .restartBtn");

const resultBox =document.querySelector(".resultBox");
const quitBtn = document.querySelector(".restartQuitBtn .quitBtn");

start.onclick = () => {
    rulesBox.classList.add("activeInfo");
    frontPage.style.opacity = "0"; 
}

exit.onclick = () => {
    rulesBox.classList.remove("activeInfo"); 
    frontPage.style.opacity = "1";
}
Continue.onclick = () => {
    rulesBox.classList.remove("activeInfo");
    questionBox.classList.add("activeInfo");
    showQuestions(0);
    startTimer(15);
    startTimerLine(0);
}

quitBtn.onclick = () => {
    window.location.reload();
}
restartBtn.onclick = () => {
    resultBox.classList.remove("activeInfo");
    questionBox.classList.add("activeInfo");
    showQuestions(0);
    startTimer(15);
    startTimerLine(0);
    count = 0;
    counter;
    timeValue =15;
    counterLine;
    widthValue = 0;
    userScore = 0;
}
const nextQuestion = document.querySelector(".nextQuestionBtn .nextQuestion");
let count = 0;
let counter;
let timeValue =15;
let counterLine;
let widthValue = 0;
let userScore = 0;

nextQuestion.onclick = ()=>{
    if(count<questions.length-1){
        count++;
        showQuestions(count);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
    }else{
        showResultBox();
    }
    nextQuestion.style.display = "none";
}
const optionsList = document.querySelector(`.fourOptions`);
function showQuestions(index){
    const questionTag = document.querySelector('.question');
    
    let questionText  = questions[index].numb+'. '    + questions[index].question;
    let optionTag     = '<div class="option"><span>'  + questions[index].options[0] + '</span></div>'
                       +'<div class="option"><span>'  + questions[index].options[1] + '</span></div>'
                       +'<div class="option"><span>'  + questions[index].options[2] + '</span></div>'
                       +'<div class="option"><span>'  + questions[index].options[3] + '</span></div>';           
    questionTag.innerHTML = questionText;
    optionsList.innerHTML = optionTag;

    const total_que = document.querySelector(".footNote");

    let total_queTag = questions[index].numb + ' of 5 questions';
    total_que.innerHTML = total_queTag;

    const option = optionsList.querySelectorAll(".option");

    for(let i=0; i<option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    } 
}
let tickIcon = '<div class = "tick icon"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class = "cross icon"><i class="fas fa-times"></i></div>';
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[count].answer;
    let alloptions = optionsList.children.length;
    if(userAns == correctAns){
        userScore += 1;
        answer.classList.add("correct")
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        for(let i=0; i<alloptions; i++){
            if( optionsList.children[i].textContent == correctAns ){
                optionsList.children[i].setAttribute("class", "option correct");
                optionsList.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }
    for(let i=0; i<alloptions; i++){
        optionsList.children[i].classList.add("disabled");
    }
    nextQuestion.style.display = "block";
}
function showResultBox(){
    rulesBox.classList.remove("activeInfo");
    questionBox.classList.remove("activeInfo");
    resultBox.classList.add("activeInfo");
    const scoreText = document.querySelector(".scoreText");
    if(userScore>3){
        let scoreTag = '<span>Congratulation! You Got <p>'+userScore+'</p> Out of <p>'+questions.length+'</p></span>';
        scoreText.innerHTML= scoreTag;
    }
    else if(userScore>1){
        let scoreTag = '<span>Carry On! You Got <p>'+ userScore +'</p> Out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML= scoreTag;
    }
    else if(userScore<1){
        let scoreTag = '<span>Sorry! You Got <p>'+ userScore +'</p> Out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML= scoreTag;
    }
}
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.innerHTML = time;
        time--;
        if(time<9){
            let addZero = timeCount.innerHTML;
            timeCount.innerHTML = "0" + addZero;
        }
        if(time<0){
            clearInterval(counter);
            timeCount.textContent ="00";
            for(let i=0; i<optionsList.children.length; i++){
                optionsList.children[i].classList.add("disabled");
            }
            nextQuestion.style.display = "block";
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 50);
    function timer(){
        time += 1
        timeLine.style.width = time + "px";
        if(time>319){
            clearInterval(counterLine);
        }
    }
}



