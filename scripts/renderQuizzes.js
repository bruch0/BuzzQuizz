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
    let checkerNumber = 0;
    for (let i = response.data.length - 1; i > 1 ; i--) {
        let checker = response.data.length - i === ignoreOnLoadingAllQuizzes[checkerNumber];
        if (!checker) {
            quizzes +=`<div class="quizz">
                        <button onclick="callQuizz(${response.data[i].id})" id="quizz-${response.data[i].id}"></button>
                        <p class="title">${response.data[i].title}</p>
                    </div>
                    `
        }
        else {
            checkerNumber ++;
        }
    }
    document.querySelector('.all-quizzes').innerHTML = quizzes;

    for (let i = response.data.length; i > 0 ; i--) {
        let insertImage = document.querySelector(`#quizz-${i}`);
        let check = insertImage === null;
        if (!check) {
            insertImage.style.background = 
            `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.1%, #000000 100%), url(${response.data[response.data.length - i].image})`;
        }
        
    }
    hideLoading();
}

getQuizzes();
