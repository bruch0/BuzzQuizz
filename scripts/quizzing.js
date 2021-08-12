let actual = '.home';

function callQuizz(id) {
    callLoading();
    let promise = axios.get(`${URL_API}quizzes/${id}`)
    .then(renderQuizzing)
    .catch();
    document.querySelector(actual).style.display = 'none';
    actual = '.quizzing';
}

function renderQuizzing(response) {
    document.querySelector('main').style.margin = '68px auto';
    document.querySelector('.quizzing-header').style.display = 'block';
    document.querySelector('.quizzing-header img').style.background = 
    `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${response.data.image})`;
    document.querySelector('.quizzing-header p').innerHTML = response.data.title;

    for (let i = 0; i < response.data.questions.length; i++) {
        document.querySelector('section.quizzing').innerHTML += 
        `<div class="question">
            <div class="container">
                <p class="title unset"></p>
            
                <div class="options">
                    <div>
                        <button class="unset" id="img-1"></button>
                        <p class="unset"></p>
                    </div>
                    <div>
                        <button class="unset" id="img-2"></button>
                        <p class="unset"></p>
                    </div>
                    <div>
                        <button class="unset" id="img-3"></button>
                        <p class="unset"></p>
                    </div>
                    <div>
                        <button class="unset" id="img-4"></button>
                        <p class="unset"></p>
                    </div>
                </div>
            </div>
        </div>`
    }

    renderQuestions(response);
    
}

function renderQuestions (response) {
    for (let i = 0; i < response.data.questions.length; i++) {
        document.querySelector('.question .title.unset').innerHTML = response.data.questions[i].title;
        document.querySelector('.question .title.unset').classList.remove('unset');
        for (let j = 0; j < 4 ; j++) {
            document.querySelector('.question .options p.unset').innerHTML = response.data.questions[i].answers[j].text;
            document.querySelector('.question .options p.unset').classList.remove('unset');
    
            document.querySelector('.question button.unset').style.background = `url(${response.data.questions[i].answers[j].image})`;
            document.querySelector('.question button.unset').classList.remove('unset');
        }
    }
    
    hideLoading();
    document.querySelector('.quizzing').style.display = 'flex';
}