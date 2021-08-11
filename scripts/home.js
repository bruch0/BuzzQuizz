function loadHome() {
    // se nao tiver quizzes, 
    let myQuizzes = 
    `<section class="my-quizzes no-quizz">
        <p>Você não criou nenhum <br/>quizz ainda :(</p>
        <button>Criar Quizz</button>
    </section>`;

    // se tiver,
    let myQuizzes = 
    `<div class="user-quizzes">
        <p>Seus Quizzes</p>
        <ion-icon name="add-circle"></ion-icon>
    </div>
    <section class="my-quizzes no-quizz">
        <div class="quizz">
            <img>
            <p class="title">Acerte os personagens corretos dos Simpsons e prove seu amor!</p>
            <div class="options-holder">
                <img class="icon" src="assets/edit_logo.png" alt="Editar quizz">
                <img class="icon" src="assets/delete_logo.png" alt="Deletar quizz">
            </div>
        </div>
    </section>`;
    
    // tb tem que chamar uma funcao pra renderizar os quizzes do usuario
    document.querySelector('main').innerHTML = 
    `${myQuizzes} + <section class="all-quizzes"></section>`
}