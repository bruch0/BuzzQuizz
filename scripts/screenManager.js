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
    document.querySelector('main').style.margin = '69px auto';
    document.querySelector('.quizzing-header').style.display = 'block';
    document.querySelector('.quizzing-header img').style.background = 
    `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${response.data.image})`;
    document.querySelector('.quizzing-header p').innerHTML = response.data.title;

    document.querySelector('.question .title').innerHTML = response.data.questions[0].title;
    console.log(response.data.questions[0]);

    for (let i = 0; i < 4; i++) {
        document.querySelector('.question p.unset').innerHTML = response.data.questions[0].answers[i].text;
        document.getElementById(`img-${i + 1}`).src = `${response.data.questions[0].answers[i].image}`;
        console.log(response.data.questions[0].answers[i].image)

        document.querySelector('.question p.unset').classList.remove('unset');
        document.querySelector('.question img.unset').classList.remove('unset');
    }



    hideLoading();
    document.querySelector('.quizzing').style.display = 'block';
}