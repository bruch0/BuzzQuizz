let ignoreOnLoadingAllQuizzes;

function startStorage(response) {
    let test = localStorage.getItem("ids");
    if (test === null) {
        let createdQuizzes = [];
        let storage = JSON.stringify(createdQuizzes);
        localStorage.setItem('ids', storage);
        localStorage.setItem('userQuizzes', storage);
    }
    checkCreatedQuizzes(response);
}

function checkCreatedQuizzes(response) {
    let check = JSON.parse(localStorage.getItem('ids'));
    if (check.length !== 0) {
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
    ids.forEach(element => {
        response.data.forEach(quizz => {
            if(element === quizz.id) {
                createdQuizzes.push(
                {'title': quizz.title,
                'image':  quizz.image})
            }
        });
    });

    return createdQuizzes;
}

function loadHome(checkUserCreatedQuizzes, createdQuizzes) {
    let myQuizzes;
    let deleteSection = 
    `<div class="confirm-section">
        <div>
            Deseja realmente <br/>deletar esse quizz?
            <button class="button-1" onclick="deleteQuizz()">Deletar</button>
            <button class="button-2" onclick="closeDeleteQuizz()">Cancelar</button>
        </div>
    </div>`;

    if(!checkUserCreatedQuizzes){
        // se nao tiver quizzes, 
        myQuizzes = 
        `<section class="my-quizzes no-quizz">
            <p>Você não criou nenhum <br/>quizz ainda :(</p>
            <button onclick="loadCreatePage1()">Criar Quizz</button>
        </section>`;
    }else{
        // se tiver,
        let buttons = '';
        for (let i = 0; i < createdQuizzes.length; i++) {
            buttons += 
            `<div class="quizz">
                <button id="quizz-${ignoreOnLoadingAllQuizzes[i]}" onclick="callQuizz(${ignoreOnLoadingAllQuizzes[i]})"></button>
                <p class="title">${createdQuizzes[i].title}</p>
                <div class="options-holder">
                    <button onclick="editQuizz(${ignoreOnLoadingAllQuizzes[i]})"><img class="icon" src="assets/edit_logo.png" alt="Editar quizz"></button>
                    <button onclick="openDeleteQuizz(${ignoreOnLoadingAllQuizzes[i]})"><img class="icon" src="assets/delete_logo.png" alt="Deletar quizz"></button>
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

    document.querySelector('.home').innerHTML =
    `${myQuizzes} <p class="all-quizzes-title">Todos os Quizzes</p> <section class="all-quizzes"></section> ${deleteSection}`
}

function openDeleteQuizz(idQuizz) {
    document.querySelector('.confirm-section').style.display = 'flex';
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('.button-1').setAttribute('onclick', `deleteQuizz(${idQuizz})`)
}

function closeDeleteQuizz() {
    document.querySelector('.confirm-section').style.display = 'none';
    document.querySelector('body').style.overflow = 'initial';
}

function deleteQuizz(idQuizz) {
    callLoading();
    let key;
    let deleteKey = JSON.parse(localStorage.getItem('userQuizzes'));
    console.log(deleteKey)
    deleteKey.forEach(element => {
        console.log(element.key)
        if (element.id === idQuizz) {
            key = element.key
        }
    });

    let URL = `https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes/${idQuizz}`
    console.log(URL)

    let promise = axios.delete(URL, {
    headers: {'Secret-Key': key}
    })

    deleteFromStorage(idQuizz);
    deleteFromStoragedIds(idQuizz);
    window.location.reload();
}

function deleteFromStorage(id) {
    let local = JSON.parse(localStorage.getItem('userQuizzes'))
            let newUserQuizzes = local.filter(function(local) {
                                    if(local.id !== id) {
                                        return true
                                    }
                                })

    let storage = JSON.stringify(newUserQuizzes);
    localStorage.setItem('userQuizzes', storage);
}

function deleteFromStoragedIds(id) {
    let local = JSON.parse(localStorage.getItem('ids'))
            let newUserIds = local.filter(function(local) {
                                    if(local !== id) {
                                        return true
                                    }
                                })

    let storage = JSON.stringify(newUserIds);
    localStorage.setItem('ids', storage);
}