const start_box = document.querySelector('.start_box');
const startButton = document.querySelector('.start_box button');

const info_box = document.querySelector('.info_box');
const info_list = document.querySelector('.info_list');
const quitButtonInfoBox = document.querySelector('.info_box .buttons .quit');
const startButtonInfoBox = document.querySelector('.info_box .buttons .start');

const quiz_box = document.querySelector('.quiz_box');
const timeCounter = document.querySelector('.quiz_box .timer .time_seconds');
const timeLine = document.querySelector('.quiz_box .timer .time_line');
const resultNumTextQuizBox = document.querySelector('.quiz_box footer .total_questions p .complete_num');
const questionsNumTextQuizBox = document.querySelector('.quiz_box footer .total_questions p .question_num');
const nextQuestionButton = document.querySelector('.quiz_box footer .next_btn');
const options_list = document.querySelector('.option_list');
const tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
const crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';
let Questions_number = 1;
let counter;
let timeValue = 10;
let widthValue= 0;
let counterLine;

const result_box = document.querySelector('.result_box');
const resultNumTextResultBox = document.querySelector('.result_box p .result_num');
const questionsNumTextResultBox = document.querySelector('.result_box p .question_num');
const restartButtonResultBox = document.querySelector('.result_box .buttons .restart');
const quitButtonResultBox = document.querySelector('.result_box .buttons .quit');
let correct_answers = 0;
let incorrect_answers = 0;

// Show Info Box When Click on ####startButton####
startButton.addEventListener('click',function(){
    start_box.classList.add('hide');
    info_box.classList.add('activeBox');
    showInfoBox();
});

function showInfoBox() {
    let ruleTag1 = `<li class="info">1. You will have <span class="seconds">${timeValue} seconds</span> per each question.</li>`;
    info_list.innerHTML = ruleTag1;

    for (let i = 0; i < Rules.length; i++) {
        info_list.innerHTML += ` <li class="info">${Rules[i]}</li> `;
    }
}

// Close Info Box When Click on ####quitButtonInfoBox####
quitButtonInfoBox.addEventListener('click',function(){
    start_box.classList.remove('hide');
    info_box.classList.remove('activeBox');
});

// Show Quiz Box When Click on ####startButtonInfoBox####
startButtonInfoBox.addEventListener('click',function(){
    info_box.classList.add('hide');
    quiz_box.classList.add('activeBox');
    startTime(timeValue);
    startTimeLine(widthValue);
    showQuestions(0);
    questionsNumTextQuizBox.innerHTML = QuestionsBank.length;
});

// click on next btn ###nextQuestionButton###
nextQuestionButton.onclick = ()=> {
    if(Questions_number < QuestionsBank.length) {
        nextQuestionButton.style.display = "none";
        clearInterval(counter);
        startTime(timeValue);
        clearInterval(counterLine);
        startTimeLine(widthValue);
        showQuestions(Questions_number);
        Questions_number++;
    } else {
        // show results
        showFinalResults();
    }
    resultNumTextQuizBox.innerHTML = Questions_number;
}

// getting Questions from QuestionsBank
function showQuestions(index) {
    // Question
    const question_text = document.querySelector('.question_text');
    question_text.innerHTML = `<span>${QuestionsBank[index].num}: ${QuestionsBank[index].Question} ?</span>`;
    
    // Options    
    options_list.innerHTML = ''
    for(let i=0; i<QuestionsBank[index].Options.length ; i++){
        let option = QuestionsBank[index].Options[i];
        let option_tag = `<div class="option" onClick="optionSelected(this)"><span>${option}</span></div>`;
        options_list.innerHTML += option_tag;
    }
}

function optionSelected(element) {
    clearInterval(counter);
    clearInterval(counterLine);

    let user_answer = element.innerText;
    let correct_answer = QuestionsBank[Questions_number - 1].Answer;
    const all_options = options_list.children.length;

    if (user_answer === correct_answer) {
        element.classList.add('correct');
        element.insertAdjacentHTML('beforeend',tickIcon);
        correct_answers++;
    } else {
        element.classList.add('incorrect');
        element.insertAdjacentHTML('beforeend',crossIcon);
        incorrect_answers++

        for(let i=0; i < all_options ; i++){
            if (options_list.children[i].textContent === correct_answer) {
                options_list.children[i].classList.add('correct');
                options_list.children[i].insertAdjacentHTML('beforeend',tickIcon);
            }
        }
    }

    for (let i = 0; i < all_options; i++) {
        options_list.children[i].classList.add('disabled')
    }

    nextQuestionButton.style.display = "block";
}

function startTime(time) {
    counter = setInterval( timer, 1000 );
    
    function timer() {
        timeCounter.textContent = time;
        timeCounter.classList.remove('timeout');
        time--;

        if(time < 9) {
            timeCounter.textContent = "0" + time;
        }

        if( time < 0) {
            clearInterval(counter);
            timeCounter.textContent = '00';
            timeCounter.classList.add('timeout');


            let correct_answer = QuestionsBank[Questions_number - 1].Answer;
            const all_options = options_list.children.length;

            for(let i=0; i < all_options ; i++){
                if (options_list.children[i].textContent === correct_answer) {
                    options_list.children[i].classList.add('correct');
                    options_list.children[i].insertAdjacentHTML('beforeend',tickIcon);
                }
            }

            for (let i = 0; i < all_options; i++) {
                options_list.children[i].classList.add('disabled')
            }
            incorrect_answers++
            nextQuestionButton.style.display = "block";

        }
    }
}

function startTimeLine(width) {
    let quiz_box_style = getComputedStyle(quiz_box);

    if(quiz_box_style.width == '350px'){
        counterLine = setInterval( timer, 31.42 );
    } else if (quiz_box_style.width == '550px') {
        counterLine = setInterval( timer, 20 );
    }
    
    function timer() {
        width += 1;
        timeLine.style.width = width + 'px';

        if(width > Number(quiz_box_style.width.slice(0,3))) {
            clearInterval(counterLine);
        }
    }
}

function showFinalResults() {
    quiz_box.classList.add('hide');
    result_box.classList.add('activeBox');
    resultNumTextResultBox.innerHTML = correct_answers;
    questionsNumTextResultBox.innerHTML = QuestionsBank.length;
    restartButtonResultBox.addEventListener('click', function(){
        window.location.reload();
    })
    quitButtonResultBox.addEventListener('click', function(){
        window.close();
    })
}

// stop vid 00:45:17