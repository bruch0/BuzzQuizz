function loadHome() {
    let temQuizzes = false;

    if(!temQuizzes){
        // se nao tiver quizzes, 
        let myQuizzes = 
        `<section class="my-quizzes no-quizz">
            <p>Você não criou nenhum <br/>quizz ainda :(</p>
            <button>Criar Quizz</button>
        </section>`;
    }else{
        // se tiver,
        let myQuizzes = 
        `<div class="user-quizzes">
            <p>Seus Quizzes</p>
            <button onclick="loadCreatePage1()"><ion-icon name="add-circle"></ion-icon></button>
        </div>
        <section class="my-quizzes">
            <div class="quizz">
                <button></button>
                <p class="title">Acerte os personagens corretos dos Simpsons e prove seu amor!</p>
                <div class="options-holder">
                    <button><img class="icon" src="assets/edit_logo.png" alt="Editar quizz"></button>
                    <button><img class="icon" src="assets/delete_logo.png" alt="Deletar quizz"></button>
                </div>
            </div>
        </section>`;
    }
    // tb tem que chamar uma funcao pra renderizar os quizzes do usuario
    document.querySelector('main').innerHTML = 
    `${myQuizzes} <section class="all-quizzes"></section>`
}