let quizzLevels = [];
let quizzQuestions = [];
let newQuizz = {};
let quizzTitle, quizzImg = "";
let nQuestions, nLevels = 0;


//VALIDATION FUNCTIONS
function isValidPage1(){
    //validade inputs page1
    if (quizzImg==="" || quizzTitle==="" || nQuestions==="" || nLevels===""){
        alert("Preencha os campos corretamente");
        return false;
    }else{
        nQuestions = Number(nQuestions);
        nLevels = Number(nLevels);
        if(isNaN(nQuestions) || isNaN(nLevels)){
            alert("A quantidade de questões e a quantidade de níveis devem ser números");
            return false;
        }
        if(quizzTitle.length < 20 || quizzTitle.length > 65){
            alert("O título deve conter entre 20 e 65 caracteres");
            return false;
        }
        if(!isValidUrl(quizzImg)){
            alert("Link da imagem inválido");
            return false;
        }
        if(nQuestions < 3){
            alert("O quizz deve conter pelo menos 3 questões");
            return false;
        }
        if(nLevels < 2){
            alert("O quizz deve conter pelo menos 2 níveis");
            return false;
        }

        return true;
    }
}

function isValidPage2(){
    
    for(let i=0; i<nQuestions; i++){
        if(quizzQuestions[i].title === "" || quizzQuestions[i].color === ""){
            alert("Preencha todos os campos");
            return false;
        }else{
            if(quizzQuestions[i].title.length < 20){
                alert("O título deve conter ao menos 20 caracteres");
                return false;
            }
            if(!isHexColor(quizzQuestions[i].color)){
                alert("A cor deve ser hexadecimal válida");
                return false;
            }

            for(let j=0; j<quizzQuestions[i].answers.length; j++){
                if(quizzQuestions[i].answers[j].text === "" || quizzQuestions[i].answers[j].image === ""){
                    alert("Preencha os campos corretamente");
                    return false;
                }else{
                    if(!isValidUrl(quizzQuestions[i].answers[j].image)){
                        alert("As imagens devem conter link de URL válido");
                        return false;
                    }
                    if(quizzQuestions[i].answers.length < 2){
                        alert("Uma pergunta deve conter dentre 2 e 4 respostas");
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

function isValidPage3(){
    let minZero = false;
    for(let i=0; i<nLevels; i++){
        quizzLevels[i].minValue = Number(quizzLevels[i].minValue);
        if (quizzLevels[i].minValue === 0){
            minZero = true;
        }
        if( quizzLevels[i].title==="" || quizzLevels[i].image==="" || quizzLevels[i].text==="" || quizzLevels[i].minValue===""){
            alert("Preencha todos os campos");
            return false;
        }
        if( isNaN(quizzLevels[i].minValue)){
            alert("A porcentagem de acerto mínimo deve ser um número");
            return false;
        }
        if( quizzLevels[i].title.length < 10){
            alert("O título deve conter pelo menos 10 caracteres");
            return false;
        }
        if( !isValidUrl(quizzLevels[i].image) ){
            alert("O link de imagem deve ser uma URL válida");
            return false;
        }
        if ( quizzLevels[i].text.length < 30 ){
            alert("A descrição deve conter no mínimo 30 caracteres");
            return false;
        }
        if ( quizzLevels[i].minValue<0 || quizzLevels[i].minValue > 100){
            alert("A porcentagem de acerto mínimo deve ser um número entre 0 e 100");
            return false;
        }
    }
    if(!minZero){
        alert("Ao menos um nível deve ter como porcentagem mínima 0%");
        return false;
    }
    return true;
}

function isValidUrl(string) { 
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
 }

function isHexColor(color){
    if(/^#[0-9A-F]{6}$/i.test(color)){
        return true;
    }else{
        return false;
    }
}

//PAGE FUNCTIONS
function loadCreatePage1(){
    document.querySelector(".home").style.display = "none";
    document.querySelector(".create-1").style.display = "flex";
}

function finishPage1(editMode, idQuizz){
    quizzTitle = document.getElementById("newQuizzTitle").value;
    quizzImg = document.getElementById("newQuizzImg").value;
    nQuestions = document.getElementById("numberQuestions").value;
    nLevels = document.getElementById("numberLevels").value;

    if (isValidPage1()){
        loadCreatePage2(editMode, idQuizz);
    }else{
        return;
    }
}

function loadCreatePage2(editMode, idQuizz) {
    document.querySelector(".create-1").style.display = "none";
    document.querySelector(".create-2").style.display = "flex";
    let ul = document.querySelector(".newQuestions");
    ul.innerHTML = "";
    for (let i=0; i<nQuestions; i++){
        ul.innerHTML += `
        <li class="newQuestion close">
            <span onclick="animateCard(this, '.newQuestion-content')">Pergunta ${i+1}</span>
            <ion-icon name="create-outline" onclick="animateCard(this, '.newQuestion-content')"></ion-icon>
            <div class="newQuestion-content unset">
                <input type="text" class="newQuestionText" placeholder="Texto da pergunta">
                <input type="text" class="newQuestionColor" placeholder="Cor de fundo da pergunta">
                <span>Resposta correta</span>
                <input type="text" class="correctAnswer" placeholder="Resposta correta">
                <input type="text" class="correctAnswerImg" placeholder="URL da imagem">
                <span>Respostas incorretas</span>
                <input type="text" class="wrongAnswer1" placeholder="Resposta incorreta 1">
                <input type="text" class="wrongAnswerImg1 input-separation" placeholder="URL da imagem 1">
                <input type="text" class="wrongAnswer2" placeholder="Resposta incorreta 2">
                <input type="text" class="wrongAnswerImg2 input-separation" placeholder="URL da imagem 2">
                <input type="text" class="wrongAnswer3" placeholder="Resposta incorreta 3">
                <input type="text" class="wrongAnswerImg3"  placeholder="URL da imagem 3">
            </div>
        </li>
        `
    }
    if (editMode === true) {
        let promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes/${idQuizz}`)
    .then(insertInfoPage2);
    }
}

function finishPage2(editMode, idQuizz){
    let questions = document.querySelectorAll(".newQuestion");
    let localQuestion = {};
    let localAnswers = [];
    let ans ={};

    for (let i=0; i<nQuestions; i++){
        localQuestion = {
            title: questions[i].querySelector(".newQuestionText").value,
			color: questions[i].querySelector(".newQuestionColor").value,
        };

        let correctAnswer = questions[i].querySelector(".correctAnswer").value;
        let correctAnswerImg = questions[i].querySelector(".correctAnswerImg").value;
        let wrongAnswer1 = questions[i].querySelector(".wrongAnswer1").value;
        let wrongAnswerImg1 = questions[i].querySelector(".wrongAnswerImg1").value;
        let wrongAnswer2 = questions[i].querySelector(".wrongAnswer2").value;
        let wrongAnswerImg2 = questions[i].querySelector(".wrongAnswerImg2").value;
        let wrongAnswer3 = questions[i].querySelector(".wrongAnswer3").value;
        let wrongAnswerImg3 = questions[i].querySelector(".wrongAnswerImg3").value;
        
        //get the correct answer
        ans = {
                text: correctAnswer,
				image: correctAnswerImg,
				isCorrectAnswer: true
            };
        localAnswers.push(ans);

        //get the wrong answers if they exist 
        if (wrongAnswer1 !== "" && wrongAnswerImg1 !== ""){
            ans = {
                text: wrongAnswer1,
				image: wrongAnswerImg1,
				isCorrectAnswer: false
            };
            localAnswers.push(ans);
        }

        if (wrongAnswer2 !== "" && wrongAnswerImg2 !== ""){
            ans = {
                text: wrongAnswer2,
				image: wrongAnswerImg2,
				isCorrectAnswer: false
            };
            localAnswers.push(ans);
        }

        if (wrongAnswer3 !== "" && wrongAnswerImg3 !== ""){
            ans = {
                text: wrongAnswer3,
				image: wrongAnswerImg3,
				isCorrectAnswer: false
            };
            localAnswers.push(ans);
        }
        //save the information
        localQuestion.answers = localAnswers;
        quizzQuestions.push(localQuestion);
        //reset variables
        localQuestion = {};
        localAnswers = [];
        ans ={};
    }
  
   if(isValidPage2()){
       loadCreatePage3(editMode, idQuizz);
   }else{
       //if the page is not valid, then
       //reset questions
       quizzQuestions=[];
       return;
   }
}

function loadCreatePage3(editMode, idQuizz){
    document.querySelector(".create-2").style.display = "none";
    document.querySelector(".create-3").style.display = "flex";
    let ul = document.querySelector(".newLevels");
    ul.innerHTML = "";
    for (let i=0; i<nLevels; i++){
        ul.innerHTML += `
        <li class="newLevel close">
            <span onclick="animateCard(this, '.newLevel-content')">Nível ${i+1}</span>
            <ion-icon name="create-outline" onclick="animateCard(this, '.newLevel-content')"></ion-icon>
            <div class="newLevel-content unset">
                <input type="text" class="newLevelTitle" placeholder="Título do nível">
                <input type="text" class="newLevelPercent" placeholder="% de acerto mínima">
                <input type="text" class="newLevelImg" placeholder="URL da imagem do nível">
                <input type="text" class="newLevelDescription" placeholder="Descrição do nível">
            </div>
        </li>
        `
    }

    if (editMode === true) {
        let promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes/${idQuizz}`)
    .then(insertInfoPage3);
    }
}

function finishPage3(editMode){
    let levels = document.querySelectorAll(".newLevel");
    let localLevel = {};

    for (let i=0; i<nLevels; i++){
        localLevel = {
            title: levels[i].querySelector(".newLevelTitle").value,
            image: levels[i].querySelector(".newLevelImg").value,
            text: levels[i].querySelector(".newLevelDescription").value,
            minValue: levels[i].querySelector(".newLevelPercent").value
        };
        quizzLevels.push(localLevel);
    }

    if(isValidPage3()){
        let quizz = createQuizzObj();
        if (editMode === true) {
            sendEditionToAPI(quizz)
        }
        else {
            sendToAPI(quizz);
        }
    }else{
        quizzLevels = [];
        return;
    }
}

function loadCreatePage4(idQuizz){
    document.querySelector(".create-3").style.display = "none";
    document.querySelector(".create-4").style.display = "flex";
    document.querySelector('.create-4 .nextButton').setAttribute('onclick', `callQuizz(${idQuizz})`)
    document.querySelector('.create-4 .quizz').innerHTML = `
        <button onclick="callQuizz(${idQuizz})" ></button>
        <p class="title">${quizzTitle}</p>`
    let insertImage = document.querySelector('.create-4 .quizz button');
    insertImage.style.background = 
            `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.1%, #000000 100%), url(${quizzImg})`;
}

function createQuizzObj(){
    newQuizz = {
        title: quizzTitle,  
        image: quizzImg,
        questions: quizzQuestions,
        levels: quizzLevels
    }
    return newQuizz;
}

function animateCard(elem, type){
    if (elem.parentNode.classList.contains("close")){
        //if is closed
        elem.parentNode.classList.remove("close");
        elem.parentNode.style.flexDirection = "column";
        elem.parentNode.querySelector("ion-icon").style.display = "none";
        elem.parentNode.querySelector(type).style.display = "flex";
    }else{
        //if is open
        elem.parentNode.classList.add("close");
        elem.parentNode.style.flexDirection = "initial";
        elem.parentNode.querySelector("ion-icon").style.display = "block";
        elem.parentNode.querySelector(type).style.display = "none";
    }

}

function sendToAPI(obj) {
    callLoading();
    let promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes', obj)
    .then(function(response) {
        let id;
        let local = JSON.parse(localStorage.getItem('userQuizzes'))
        local.push({id: response.data.id, key: response.data.key});
        let storage = JSON.stringify(local);
        localStorage.setItem('userQuizzes', storage);
        hideLoading();
        addIds();
        id = response.data.id;
        loadCreatePage4(id);
        })
}

function addIds() {
    let ids = [];
    let local = JSON.parse(localStorage.getItem('userQuizzes'))
    local.forEach(function(element) {
        ids.push(element.id)
    })

    let storage = JSON.stringify(ids);
    localStorage.setItem('ids', storage);
}

function sendEditionToAPI(obj) {
    callLoading();
    let promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes', obj)
    .then(function(response) {
        let id;
        let key;
        let deleteKey = JSON.parse(localStorage.getItem('userQuizzes'));
        deleteKey.forEach(element => {
            if (element.id === idQuizz) {
                key = element.key
            }
        });

        let URL = `https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes/${idQuizz}`

        let promise = axios.put(URL, {
        headers: {'Secret-Key': key}
        })
        id = response.data.id;
        loadCreatePage4(id);

        hideLoading();
        })
}