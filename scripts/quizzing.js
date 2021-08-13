let object;
let points = 0;
let pointsPerQuestion = 0;
let idQuizz;

function callQuizz(id) {
    idQuizz = id
    callLoading();
    let promise = axios.get(`${URL_API}quizzes/${id}`)
    .then(renderQuizzing)
    .catch();
    document.querySelector('.home').style.display = 'none';
}

function renderQuizzing(response) {
    document.querySelector('main').style.margin = '68px auto';
    document.querySelector('.quizzing-header').style.display = 'block';
    document.querySelector('.quizzing-header img').style.background = 
    `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${response.data.image})`;
    document.querySelector('.quizzing-header p').innerHTML = response.data.title;

    for (let i = 0; i < response.data.questions.length; i++) {
        let nButtons = response.data.questions[i].answers.length;
        let buttons = '';
        for (let j = 0; j < nButtons; j++) {
            buttons += `<div onclick="selectAnswer(this)">
                            <button class="unset" id="${i} ${j}"></button>
                            <p class="unset"></p>
                        </div>`;
        }
        

        document.querySelector('section.quizzing').innerHTML += 
        `<div class="question">
            <div class="container">
                <p class="title unset"></p>
            
                <div class="options">
                    ${buttons}
                </div>
            </div>
        </div>`
    }
    document.querySelector('section.quizzing').innerHTML += 
    `<div class="score">
        <div class="container">
            <p class="title"></p>
            <div class="description">
                <img>
                <p></>
            </div>
        </div>
    </div>
    <div class="options-endgame">
        <button class="play-again" onclick="resetValues(true)">Reiniciar Quizz</button>
        <button class="home" onclick="home()">Voltar para home</button>
    </div>`

    renderQuestions(response);
    pointsPerQuestion = 100 / response.data.questions.length;
}

function renderQuestions (response) {
    for (let i = 0; i < response.data.questions.length; i++) {
        document.querySelector('.question .title.unset').innerHTML = response.data.questions[i].title;
        document.querySelector('.question .title.unset').style.backgroundColor = response.data.questions[i].color;
        document.querySelector('.question .title.unset').classList.remove('unset');
        for (let j = 0; j < response.data.questions[i].answers.length ; j++) {
            document.querySelector('.question .options p.unset').innerHTML = response.data.questions[i].answers[j].text;
            document.querySelector('.question .options p.unset').classList.remove('unset');
    
            document.querySelector('.question button.unset').style.background = `url(${response.data.questions[i].answers[j].image})`;
            document.querySelector('.question button.unset').classList.remove('unset');
        }
    }
    
    hideLoading();
    document.querySelector('.quizzing').style.display = 'flex';
    object = response.data;
}

function selectAnswer(element) {
    element.classList.add('selected');
    correctChoice(object, element);
    isQuizzComplete();
}

function correctChoice(object, element) {
    let questionNumber = element.firstElementChild.id[0];

    for (let i = 0; i < element.parentNode.children.length; i++) {
        if (object.questions[questionNumber].answers[i].isCorrectAnswer) {
            document.getElementById(`${questionNumber} ${i}`).parentNode.classList.add('right');
        }
        else {
            document.getElementById(`${questionNumber} ${i}`).parentNode.classList.add('wrong');
        }
    }
    disableQuestion(element);
    evaluateAnswer(element);
    scrollToNextQuestion(questionNumber);
}

function disableQuestion(element) {
    let disable = element.parentNode.querySelectorAll('button');

    for (let i = 0; i < disable.length; i++) {
        disable[i].disabled = true;
    }
}

function evaluateAnswer(element) {
    if (element.classList.contains('right')) {
        points += pointsPerQuestion;
    }
}

function scrollToNextQuestion(questionAnswered) {
    let scroll = document.querySelector('.quizzing').children;
    setTimeout(function() {
        scroll[parseInt(questionAnswered) + 2].scrollIntoView();
    }, 2000)
}

function isQuizzComplete() {
    let answeredQuestions = document.querySelectorAll('.selected').length;
    if (answeredQuestions === object.questions.length) {
        showScore();
    }
}

function showScore() {
    points = parseInt(points);
    
    if (points > 100) {
        points = 100;
    }
    let level;

    for (let i = object.levels.length; i > 0; i--) {
        if (points >= object.levels[i - 1].minValue) {
            level = i - 1;
            break;
        }
    }

    document.querySelector('.score .title').innerHTML = 
    `${points}% de acerto: ${object.levels[level].title}`;
    document.querySelector('.score img').src = object.levels[level].image;
    document.querySelector('.description p').innerHTML = object.levels[level].text;

    document.querySelector('.score').style.display = 'block';
    document.querySelector('.options-endgame').style.display = 'flex';
}

function resetValues(playAgain) {
    points = 0;
    let removeQuestions = document.querySelector('.quizzing').children;
    let length = removeQuestions.length;
    
    for (let i = 1; i < length; i++) {
        removeQuestions[1].remove();
    }
    if (playAgain === true) {
        callQuizz(idQuizz);
    }
}

function home() {
    resetValues(false);

    document.querySelector('.quizzing').style.display = 'none';
    document.querySelector('.home').style.display = 'block';
}