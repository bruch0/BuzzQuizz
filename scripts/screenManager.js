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
    document.querySelector('main').style.margin = '69px 0px';
    document.querySelector('.quizzing img').style.background = 
    `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${response.data.image})`;
    document.querySelector('.quizzing p').innerHTML = response.data.title;
    console.log(response.data);



    hideLoading();
    document.querySelector('.quizzing').style.display = 'block';
}