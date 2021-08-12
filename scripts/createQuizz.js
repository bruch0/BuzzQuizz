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
        <li class="newQuestion close" onclick="animateNewQuestion(this)">
            <span>Pergunta ${i+1}</span>
            <ion-icon name="create-outline"></ion-icon>
            <div class="newQuestion-content">
                <input type="text" name="newQuestionText" placeholder="Texto da pergunta">
                <input type="text" name="newQuestionColor" placeholder="Cor de fundo da pergunta">
                <span>Resposta correta</span>
                <input type="text" name="correctAnswer" placeholder="Resposta correta">
                <input type="text" name="correctImg" placeholder="URL da imagem">
                <span>Respostas incorretas</span>
                <input type="text" name="wrongAnswer1" placeholder="Resposta incorreta 1">
                <input type="text" name="wrongImg1" class="input-separation" placeholder="URL da imagem 1">
                <input type="text" name="wronAnswer2" placeholder="Resposta incorreta 2">
                <input type="text" name="wrongImg2" class="input-separation" placeholder="URL da imagem 2">
                <input type="text" name="wronAnswer3" placeholder="Resposta incorreta 3">
                <input type="text" name="wrongImg3"  placeholder="URL da imagem 3">
            </div>
        </li>
        `
    }
}

function finishPage2(){

}

function animateNewQuestion(elem){
    if (elem.classList.contains("close")){
        //if is closed
        elem.classList.remove("close");
        elem.style.flexDirection = "column";
        elem.querySelector("ion-icon").style.display = "none";
        elem.querySelector(".newQuestion-content").style.display = "flex";
    }else{
        //if is open
        elem.classList.add("close");
        elem.style.flexDirection = "initial";
        elem.querySelector("ion-icon").style.display = "block";
        elem.querySelector(".newQuestion-content").style.display = "none";
    }

}

