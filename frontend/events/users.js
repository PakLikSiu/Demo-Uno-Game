import axios from 'axios'
import { incomingMessage } from '../chat/sessionChat'

let getSessionUsers = (id) => {
    axios.get(`/users/${id}`).then(users => {

        users.data.map(user => {
            //select score container from page
            let score = document.querySelector(".score")

            //create score player element
            let scorePlayer = document.createElement("div")
            scorePlayer.classList.add("score__player")
            scorePlayer.setAttribute("id", user.id);
            if(user.turn === true){
                scorePlayer.setAttribute("style", "top: -5px; left: -10px; background-color: var(--green);")
            }

            //create username element
            let scorePlayerUsername = document.createElement("p")
            scorePlayerUsername.classList.add("score__player--username")

            //append text to username element
            let node = document.createTextNode(user.User.username)
            scorePlayerUsername.appendChild(node)

            //append username element to container
            scorePlayer.appendChild(scorePlayerUsername)

            //append to DOM
            score.appendChild(scorePlayer)
        })
    })
}

let updateUsers = (data) => {

    //select score container from page
    let score = document.querySelector(".score")

    //create score player element
    let scorePlayer = document.createElement("div")
    scorePlayer.classList.add("score__player")
    scorePlayer.setAttribute("id", data.playerId);
    if(data.turn === true){
        scorePlayer.setAttribute("style", "top: -5px; left: -10px; background-color: var(--green);")
    }

    //create username element
    let scorePlayerUsername = document.createElement("p")
    scorePlayerUsername.classList.add("score__player--username")

    //append text to username element
    let node = document.createTextNode(data.username)
    scorePlayerUsername.appendChild(node)

    //append username element to container
    scorePlayer.appendChild(scorePlayerUsername)

    //append to DOM
    score.appendChild(scorePlayer)

    incomingMessage(data)
}

module.exports = {
    getSessionUsers,
    updateUsers
}