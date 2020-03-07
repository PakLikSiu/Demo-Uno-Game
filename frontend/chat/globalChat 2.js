import axios from 'axios'
import regeneratorRuntime from 'regenerator-runtime'

let userData = null

let getUserData = async () => {
    let data = await axios.get("/getUserData")
    return data
}
getUserData().then( data => {userData = data})

let getGlobalMessages = async () => {
    let response = await axios.get("/globalMessages")
    response.data.map(message => {
        incomingMessage(message)
    })
    
}

//sets chatbox scroll to bottom
const chatBoxMessages = document.querySelector('.chat__box--messages')

if (chatBoxMessages != null) {
    chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight
}

let incomingMessage = (data) => {
    let chatBoxIncomingMessage = document.createElement("div")

    if (data.userId === userData.data.id) {
        chatBoxIncomingMessage.classList.add('chat__box--outgoing-message')
    } else {
        chatBoxIncomingMessage.classList.add('chat__box--incoming-message')
    }

    let node = document.createTextNode(data.messageBody)
    chatBoxIncomingMessage.appendChild(node);

    chatBoxMessages.appendChild(chatBoxIncomingMessage);

    chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight
    document.querySelector('.chat__box--input').value = ""
}

module.exports = {
    getUserData,
    getGlobalMessages,
    incomingMessage
}