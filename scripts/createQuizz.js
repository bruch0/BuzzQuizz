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
    console.log(quizzTitle);
    console.log(quizzImg);
    console.log(nQuestions);
    console.log(nLevels);
}

