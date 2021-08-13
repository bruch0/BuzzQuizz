ignoreOnLoadingAllQuizzes = [];

function startStorage(response) {
    let test = localStorage.getItem("ids");
    if (test === null) {
        let createdQuizzes = [];
        let storage = JSON.stringify(createdQuizzes);
        localStorage.setItem('ids', storage);
    }
    checkCreatedQuizzes(response);
}

function checkCreatedQuizzes(response) {
    if (localStorage.getItem('ids').length !== 0) {
        let ids = JSON.parse(localStorage.getItem('ids'));
        let createdQuizzes = returnCreatedQuizzes(ids, response);
        ignoreOnLoadingAllQuizzes = ids;
        loadHome(true, createdQuizzes);
    }
    else {
        loadHome(false, null);
    }
}

function returnCreatedQuizzes(ids, response) {
    let createdQuizzes = [];
    for (let i = 0; i < ids.length; i++) {
        createdQuizzes.push(
            {'title': response.data[Math.abs(response.data.length - ids[i])].title,
            'image':  response.data[Math.abs(response.data.length - ids[i])].image
        })
    }
    return createdQuizzes;
}

function loadHome(checkUserCreatedQuizzes, createdQuizzes) {
    let myQuizzes;
    if(!checkUserCreatedQuizzes){
        // se nao tiver quizzes, 
        myQuizzes = 
        `<section class="my-quizzes no-quizz">
            <p>Você não criou nenhum <br/>quizz ainda :(</p>
            <button>Criar Quizz</button>
        </section>`;
    }else{
        // se tiver,
        let buttons = '';

        for (let i = 0; i < createdQuizzes.length; i++) {
            buttons += 
            `<div class="quizz">
                <button id="quizz-${ignoreOnLoadingAllQuizzes[i]}" onclick="callQuizz(${ignoreOnLoadingAllQuizzes[i]})" style="background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.1%, rgb(0, 0, 0) 100%), url(${createdQuizzes[i].image});"></button>
                <p class="title">${createdQuizzes[i].title}</p>
                <div class="options-holder">
                    <button><img class="icon" src="assets/edit_logo.png" alt="Editar quizz"></button>
                    <button><img class="icon" src="assets/delete_logo.png" alt="Deletar quizz"></button>
                </div>
            </div>`
        }
        
        myQuizzes = 
        `<div class="user-quizzes">
            <p>Seus Quizzes</p>
            <button onclick="loadCreatePage1()"><ion-icon name="add-circle"></ion-icon></button>
        </div>
        <section class="my-quizzes">
            ${buttons}
        </section>`;
    }

    document.querySelector('.home').innerHTML = `${myQuizzes} <section class="all-quizzes"></section>`
}