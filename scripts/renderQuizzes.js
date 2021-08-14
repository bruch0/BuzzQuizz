const URL_API = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/';

function getQuizzes () {
    let promise = axios.get(URL_API + 'quizzes')
    .then(renderQuizzes);
    // .catch(error);
    callLoading();
}

function renderQuizzes(response) {
    startStorage(response);
    console.log(response)
    let quizzes = '';
    
    response.data.forEach(element => {
        quizzes +=`<div class="quizz">
                    <button onclick="callQuizz(${element.id})" id="quizz-${element.id}"></button>
                    <p class="title">${element.title}</p>
                </div>`
    });

    document.querySelector('.all-quizzes').innerHTML = quizzes;

    response.data.forEach(element => {
       let insertImage = document.querySelector(`#quizz-${element.id}`);
        insertImage.style.background = 
            `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.1%, #000000 100%), url(${element.image})`;
    });

    hideLoading();
}

getQuizzes();
