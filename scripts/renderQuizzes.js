const URL_API = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/';

function getQuizzes () {
    let promise = axios.get(URL_API + 'quizzes')
    .then(renderQuizzes);
    // .catch(error);
    callLoading();
}

function renderQuizzes(response) {
    startStorage(response);
    let quizzes = '';
    let checkerNumber = 0;
    let skip = [];
    for (let i = 1; i < response.data.length + 1; i++) {
        let checker = i === ignoreOnLoadingAllQuizzes[checkerNumber];
        if (!checker) {
            // se o indice nao for igual ao id dos quizzes criados
            quizzes +=`<div class="quizz">
                        <button onclick="callQuizz(${i})" id="quizz-${i}"></button>
                        <p class="title">${response.data[response.data.length - i].title}</p>
                    </div>
                    `
        }
        else {
            checkerNumber ++;
            skip.push(i) // usado pra saber quais indices pular ao renderizar a imagem de fundo
        }
    }
    document.querySelector('.all-quizzes').innerHTML = quizzes;

    for (let i = 1; i < response.data.length - ignoreOnLoadingAllQuizzes.length + 1; i++) {
        let skipCheck = i === skip[0];

        if (!skipCheck){
            console.log(i, 'vdd')
            // se não for pra skippar esse indice
            document.querySelector(`#quizz-${i}`).style.background = 
            `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.1%, #000000 100%), url(${response.data[response.data.length - 1 - i].image})`;
        }
        else {
            skip.shift();
            console.log(i, 'falso')
        }
    }
    hideLoading();
}

getQuizzes();
