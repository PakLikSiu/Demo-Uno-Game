
import { showDeck } from './gameStart'

let renderGraveyard = (data) => {
    if(document.querySelector(".session") !== null){
        removeCard()
        if(data.game.gameStarted === true){
            showDeck()
        }
        renderCard(data.card)
    }
}

let removeCard = () => {
    let graveYard = document.querySelector('.played')
    if(graveYard !== null){
        graveYard.remove()
    }
}

let renderCard = (card) => {
    let handCard = document.createElement('div')
    handCard.classList.add(`hand__card${card.color}`)
    handCard.classList.add('played')

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

    let graveYard = document.querySelector('.deck')
    if (graveYard != null) graveYard.prepend(handCard)
}

module.exports = { renderGraveyard }