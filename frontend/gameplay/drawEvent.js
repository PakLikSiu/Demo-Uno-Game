import {renderCard} from '../cards/hand'

let drawEvent = (id, cards) => {
    console.log(cards)

    cards.map(card => {
        renderCard(id, card)
    })
}

module.exports = { drawEvent }