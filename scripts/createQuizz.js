let newQuizz, quizzQuestions = [];
let quizzTitle, quizzImg = "";
let nQuestions, nLevels = 0;

function isValidUrl(string) { //this function is from stackoverflow
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
 }

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


function loadCreatePage1(){
    document.querySelector(".home").style.display = "none";
    document.querySelector(".create-1").style.display = "flex";
}

function finishPage1(){
    quizzTitle = document.getElementById("newQuizzTitle").value;
    quizzImg = document.getElementById("newQuizzImg").value;
    nQuestions = document.getElementById("numberQuestions").value;
    nLevels = document.getElementById("numberLevels").value;

    if (isValidPage1()){
        loadCreatePage2();
    }else{
        return;
    }
}

function loadCreatePage2(){
    document.querySelector(".create-1").style.display = "none";
    document.querySelector(".create-2").style.display = "flex";
    let ul = document.querySelector(".newQuestions");
    ul.innerHTML = "";
    for (let i=0; i<nQuestions; i++){
        ul.innerHTML += `
        <li class="newQuestion close">
            <span onclick="animateNewQuestion(this)">Pergunta ${i+1}</span>
            <ion-icon name="create-outline" onclick="animateNewQuestion(this)"></ion-icon>
            <div class="newQuestion-content">
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
}

function finishPage2(){
    let questions = document.querySelectorAll(".newQuestion");
    let localQuestion = {};
    let localAnswers = [];
    let ans ={};

    for (let i=0; i<nQuestions; i++){
        localQuestion = {
            title: questions[i].querySelector(".newQuestionText").value,
			color: questions[i].querySelector(".newQuestionColor").value,
        }

        let correctAnswer = questions[i].querySelector(".correctAnswer").value;
        let correctAnswerImg = questions[i].querySelector(".correctAnswerImg").value;
        let wrongAnswer1 = questions[i].querySelector(".wrongAnswer1").value;
        let wrongAnswerImg1 = questions[i].querySelector(".wrongAnswerImg1").value;
        let wrongAnswer2 = questions[i].querySelector(".wrongAnswer2").value;
        let wrongAnswerImg2 = questions[i].querySelector(".wrongAnswerImg2").value;
        let wrongAnswer3 = questions[i].querySelector(".wrongAnswer3").value;
        let wrongAnswerImg3 = questions[i].querySelector(".wrongAnswerImg3").value;
        
        ans = {
                text: correctAnswer,
				image: correctAnswerImg,
				isCorrectAnswer: true
            };
        localAnswers.push(ans);

        if (wrongAnswer1 !== "" && wrongAnswerImg1 !== ""){
            ans = {
                text: wrongAnswerImg1,
				image: wrongAnswerImg1,
				isCorrectAnswer: false
            };
            localAnswers.push(ans);
        }

        if (wrongAnswer2 !== "" && wrongAnswerImg2 !== ""){
            ans = {
                text: wrongAnswerImg2,
				image: wrongAnswerImg2,
				isCorrectAnswer: false
            };
            localAnswers.push(ans);
        }

        if (wrongAnswer3 !== "" && wrongAnswerImg3 !== ""){
            ans = {
                text: wrongAnswerImg3,
				image: wrongAnswerImg3,
				isCorrectAnswer: false
            };
            localAnswers.push(ans);
        }

        localQuestion.answers = localAnswers;
        quizzQuestions.push(localQuestion);
        localQuestion = {};
        localAnswers = [];
        ans ={};
    }
  
    console.log(quizzQuestions);
}

function animateNewQuestion(elem){
    if (elem.parentNode.classList.contains("close")){
        //if is closed
        elem.parentNode.classList.remove("close");
        elem.parentNode.style.flexDirection = "column";
        elem.parentNode.querySelector("ion-icon").style.display = "none";
        elem.parentNode.querySelector(".newQuestion-content").style.display = "flex";
    }else{
        //if is open
        elem.parentNode.classList.add("close");
        elem.parentNode.style.flexDirection = "initial";
        elem.parentNode.querySelector("ion-icon").style.display = "block";
        elem.parentNode.querySelector(".newQuestion-content").style.display = "none";
    }

}

