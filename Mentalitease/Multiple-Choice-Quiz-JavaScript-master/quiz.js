// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");


// create our questions
let questions = [
    {
        question : "I am concerned about a behavior, feeling, or something I am doing.",
        imgSrc : "assets\Blog-post\test.jpg",
        choiceA : "Quite A lot",
        choiceB : "Somewhat",
        choiceC : "Not really",
        correct : "C"
    },{
        question : "This behavior or feeling has been getting worse in the past few weeks.",
        imgSrc : "assets\Blog-post\test.jpg",
        choiceA : "Quite A lot",
        choiceB : "Somewhat",
        choiceC : "Not really",
        correct : "C"
    },{
        question : "I have tried stopping or reducing this behavior or feeling on my own.",
        imgSrc : "assets\Blog-post\test.jpg",
        choiceA : "Quite A lot",
        choiceB : "Somewhat",
        choiceC : "Not really",
        correct : "B"
    },{
        question : "My attempts at stopping or reducing this behavior or feeling have been successful.",
        imgSrc : "assets\Blog-post\test.jpg",
        choiceA : "Quite A lot",
        choiceB : "Somewhat",
        choiceC : "Not really",
        correct : "B"
    },{
        question : "I rely on my friends or family to help me with my current troubles.",
        imgSrc : "assets\Blog-post\test.jpg",
        choiceA : "Quite A lot",
        choiceB : "Somewhat",
        choiceC : "Not really",
        correct : "C"
    },{
        question : "I am finding it more difficult to cope with things than usual.",
        imgSrc : "assets\Blog-post\test.jpg",
        choiceA : "Quite A lot",
        choiceB : "Somewhat",
        choiceC : "Not really",
        correct : "A"
    },{
        question : "I am having trouble concentrating at work or school.",
        imgSrc : "assets\Blog-post\test.jpg",
        choiceA : "Quite A lot",
        choiceB : "Somewhat",
        choiceC : "Not really",
        correct : "C"
    },{
        question : "I like to think things through or talk about things that bother me.",
        imgSrc : "assets\Blog-post\test.jpg",
        choiceA : "Quite A lot",
        choiceB : "Somewhat",
        choiceC : "Not really",
        correct : "A"
    },{
        question : "I have talked to my family doctor or healthcare professional about the behavior or feeling that's troubling me.",
        imgSrc : "assets\Blog-post\test.jpg",
        choiceA : "Quite A lot",
        choiceB : "Somewhat",
        choiceC : "Not really",
        correct : "B"
    },{
        question : "I have read books or went on the Internet to discover more about the behavior or feeling that's troubling me.",
        imgSrc : "assets\Blog-post\test.jpg",
        choiceA : "Quite A lot",
        choiceB : "Somewhat",
        choiceC : "Not really",
        correct : "B"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 30; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    let text = (scorePerCent >= 80) ? "You are doing well! Remember that this score is a positive sign that you take care of yourself and must continue to. You can checkout our activities that might help you maintain your mental health." :
    (scorePerCent >= 60) ? "There is nothing to worry, but if you feel stressed, we advise you to refer to our activities page where we have mentioned the list of things that can make you feel better." :
    (scorePerCent >= 40) ? "Although not very alarming percentage, You are on the verge of being affected. It is advised for you to consult a therapist. You can take control of your health." :
    (scorePerCent >= 20) ? "You are very close to being critical and your mental health needs guidance. We recommend you to consult our experts and seek therapy." :
    "Your mental health is critical and needs utmost attention. We shall divert you to our experts and maintain your health records";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
    scoreDiv.innerHTML += "<p1>"+ text +"</p1>";
}





















