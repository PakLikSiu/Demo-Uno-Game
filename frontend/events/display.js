let loginSignupButton = document.querySelector('.button__login-signup')
let startButton = document.querySelector('.start-button')

let showModal = () => {
    let modal = document.querySelector('.modal')
    modal.style.display = "flex"
}

let showLogin = () => {
    let loginButton = document.querySelector('.modal__form--tab-login')
    let signupButton = document.querySelector('.modal__form--tab-signup')

    loginButton.addEventListener('click', () => {
        loginButton.classList.add('selected')
        signupButton.classList.remove('selected')

        let loginForm = document.querySelector('.modal__form--login')
        let signupForm = document.querySelector('.modal__form--signup')

        loginForm.style.display = "flex"
        signupForm.style.display = "none"
    })
}

let showSignup = () => {
    let loginButton = document.querySelector('.modal__form--tab-login')
    let signupButton = document.querySelector('.modal__form--tab-signup')

    signupButton.addEventListener('click', () => {
        signupButton.classList.add('selected')
        loginButton.classList.remove('selected')

        let loginForm = document.querySelector('.modal__form--login')
        let signupForm = document.querySelector('.modal__form--signup')

        loginForm.style.display = "none"
        signupForm.style.display = "flex"
    })
}

let showCreateGame = () => {
    let createGameForm = document.querySelector(".modal__create-game--form")
    createGameForm.style.display = "block"
}

if(loginSignupButton !== null){
    loginSignupButton.addEventListener('click', () => {
        showModal()
        showLogin()
        showSignup()
    })
}

if(startButton !== null){
    let modal = document.querySelector('.modal__create-game')
    let createGameButton = document.querySelector(".modal__create-game--button-cancel")

    startButton.addEventListener('click', () => {
        modal.style.display = "flex"
        showCreateGame();
    })

    createGameButton.addEventListener("click", (event) => {
        event.preventDefault()
        modal.style.display = "none"
    })
}