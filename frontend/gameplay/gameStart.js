import axios from 'axios'

//start game
let startGame = (id) => {
    let buttonStart = document.querySelector(".button__start")

    if(buttonStart !== null){
        buttonStart.addEventListener("click", function(){
            axios.get(`/start/${id}`).then( _ => {
                showDeck()
            })
        })
    }
}

let updatePlayers = (data) => {
    let players = document.querySelectorAll(".score__player")
    players.forEach( player => {

        console.log(`${player.getAttribute("id")} === ${data.playerId}`)

        let nextPlayer = parseInt(player.getAttribute("id")) === data.playerId

        if(nextPlayer){
            console.log("true")
            player.setAttribute("style", "top: -5px; left: -10px; background-color: var(--green);")
        }else {
            console.log("false")
            player.setAttribute("style", "top: 0; left: 0; background-color: var(--yellow);")
        }
    })

    showDeck()
}

let showDeck = () => {
    let deck = document.querySelector(".deck")
    let buttonStart = document.querySelector(".button__start")

    buttonStart.style.display = "none"
    deck.style.display = "flex"
}

module.exports = { startGame, updatePlayers, showDeck }