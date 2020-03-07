import axios from 'axios'
import { render } from 'pug'

let getHand = (id) => {
    axios.post(`/drawHand/${id}`).then(hand => {
        renderHand(id, hand)
    })
}

let renderHand = (id, hand) => {
    hand.data.map(card => {
        renderCard(id, card)
    })
}

let renderCard = (id, card) => {

    let handCard = document.createElement('div')
    handCard.classList.add(`hand__card${card.color}`)
    handCard.classList.add('card-to-play')
    handCard.setAttribute("id", card.id);
    handCard.classList.add("shadow")

    let handCardCircle = document.createElement('div')
    handCardCircle.classList.add(`hand__card--circle`)

    let handCardImg;

    switch (card.type) {
        case 'Reverse':
            handCardImg = document.createElement('img')
            handCardImg.classList.add("hand__card--img")
            handCardImg.src = `images/card_icons/reverse${card.color}.png`

            handCardCircle.appendChild(handCardImg)
            break

        case 'Skip':
            handCardImg = document.createElement('img')
            handCardImg.classList.add("hand__card--img")
            handCardImg.src = `images/card_icons/skip${card.color}.png`

            handCardCircle.appendChild(handCardImg)
            break

        case 'Draw Two':
            handCardImg = document.createElement('img')
            handCardImg.classList.add("hand__card--img")
            handCardImg.src = `images/card_icons/draw2${card.color}.png`

            handCardCircle.appendChild(handCardImg)
            break

        case 'wild':
            handCardImg = document.createElement('img')
            handCardImg.classList.add("hand__card--img-wild")
            handCardImg.src = `images/card_icons/wild.png`

            handCardCircle.appendChild(handCardImg)
            break

        case 'draw4':
            handCardImg = document.createElement('img')
            handCardImg.classList.add("hand__card--img-wild")
            handCardImg.src = `images/card_icons/draw4.png`

            handCardCircle.appendChild(handCardImg)
            break

        default:
            let handCardNum = document.createElement('p')
            handCardNum.classList.add('hand__card--num')

            let node = document.createTextNode(card.type)
            handCardNum.appendChild(node)

            handCardCircle.appendChild(handCardNum)
    }

    handCard.appendChild(handCardCircle)

    let hand = document.querySelector('.hand')
    if (hand != null) hand.prepend(handCard)
    
    handCard.addEventListener("click", function () {
        axios.get(`/playCard/${id}/${handCard.id}`).then( response => {
            if(response.data.sent === true){
                handCard.remove()
            }
        })
    })

}

let drawCard = (id) => {
    axios.get(`/drawCard/${id}`).then( data => {
        if(data.data.sent === true) {
            renderCard(id, data.data.card)
        }
    })
}

module.exports = {
    getHand,
    drawCard,
    renderCard
}