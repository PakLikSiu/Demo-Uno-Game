import axios from 'axios'
import regeneratorRuntime from 'regenerator-runtime'

let getSessionMessages = async (id) => {
    let response = await axios.get(`/sessionMessages/${id}`)
    response.data.map(message => {
        incomingMessage(message)
        
    })
}

let incomingMessage = (data) => {

    let userName = data.username || data.User.username

    let sessionChat = document.querySelector(".session-chat__messages")

    let sessionChatMessage = document.createElement("div")
    sessionChatMessage.classList.add("session-chat__message")

    //create messageBody element and append text
    let messageBody = document.createElement('p')
    messageBody.classList.add("session-chat__message-payload")
    let node = document.createTextNode(data.messageBody)
    messageBody.appendChild(node);

     //create username container and append initial
     let user = document.createElement('p')
     user.classList.add("session-chat__message-user--red")
     let initial = userName[0]
     let initialNode = document.createTextNode(initial)
     user.appendChild(initialNode)

    sessionChatMessage.appendChild(messageBody)
    sessionChatMessage.appendChild(user)
    
    sessionChat.appendChild(sessionChatMessage)

    sessionChat.scrollTop = sessionChat.scrollHeight
    document.querySelector('.session-chat__form-input').value = ""
}

module.exports = {incomingMessage, getSessionMessages };