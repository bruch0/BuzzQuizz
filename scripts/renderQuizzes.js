const URL_API = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/';

function getQuizzes () {
    let promise = axios.get(URL_API + 'quizzes')
    .then(renderQuizzes);
    // .catch(error);
    callLoading();
}

function renderQuizzes(response) {
    let quizzes = '';
    for (let i = 0; i < response.data.length; i++) {
        quizzes +=`<div class="quizz" id="quizz-${i + 1}">
                        <button onclick="callQuizz(${i + 1})"><img></button>
                        <p class="title">${response.data[i].title}</p>
                    </div>`
    }

    document.querySelector('.all-quizzes').innerHTML = quizzes;

    for (let i = 0; i < response.data.length; i++) {
        document.querySelector(`#quizz-${1}`).style.background = 
        `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.1%, #000000 100%), url(${response.data.image});`
    }
    hideLoading();
}

getQuizzes();
