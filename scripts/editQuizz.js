function editQuizz(idQuizz) {
    callLoading();
    loadCreatePage1();
    
    let promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes/${idQuizz}`)
    .then(insertInfoPage1);

    document.querySelector('.nextButton').setAttribute('onclick', `finishPage1(true, ${idQuizz})`)
    document.querySelector('.create-2 .nextButton').setAttribute('onclick', `finishPage2(true, ${idQuizz})`)
    document.querySelector('.create-3 .nextButton').setAttribute('onclick', `finishPage3(true)`)
}

function insertInfoPage1(response) {
    document.querySelector('#newQuizzTitle').value = response.data.title;
    document.querySelector('#newQuizzImg').value = response.data.image;
    document.querySelector('#numberQuestions').value = response.data.questions.length;
    document.querySelector('#numberLevels').value = response.data.levels.length;
    hideLoading();
}

function insertInfoPage2(response) {
    response.data.questions.forEach(function (element) {
        document.querySelector('.newQuestion-content.unset .newQuestionText').value = element.title;
        document.querySelector('.newQuestion-content.unset .newQuestionColor').value = element.color;
        document.querySelector('.newQuestion-content.unset .correctAnswer').value = element.answers[0].text;
        document.querySelector('.newQuestion-content.unset .correctAnswerImg').value = element.answers[0].image;

        for (let i = 1; i < element.answers.length; i++) {
            document.querySelector(`.newQuestion-content.unset .wrongAnswer${i}`).value = element.answers[i].text;
            document.querySelector(`.newQuestion-content.unset .wrongAnswerImg${i}`).value = element.answers[i].image;
        }

        document.querySelector('.newQuestion-content.unset').classList.remove('unset');
    })

}

function insertInfoPage3(response) {
    response.data.levels.forEach(function (element) {
        document.querySelector('.newLevel-content.unset .newLevelTitle').value = element.title;
        document.querySelector('.newLevel-content.unset .newLevelPercent').value = element.minValue;
        document.querySelector('.newLevel-content.unset .newLevelImg').value = element.image;
        document.querySelector('.newLevel-content.unset .newLevelDescription').value = element.text;

        document.querySelector('.newLevel-content.unset').classList.remove('unset');
    })
}