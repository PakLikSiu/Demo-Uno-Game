function checkValid(card, graveYardCard) {
    if(graveYardCard.dataValues.type === "wild" || graveYardCard.dataValues.type === "draw4"){
        return true
    } else if(card.dataValues.type === "wild" || card.dataValues.type === "draw4"){
        return true
    } else {
        if(card.dataValues.color === graveYardCard.dataValues.color || card.dataValues.type === graveYardCard.dataValues.type) {
            return true
        } else {
            return false
        }
    }
}

let getNextPlayer = (reverse, currentPlayer, playerCount) => {
    if(reverse === false || reverse === null){
        if(currentPlayer >= playerCount){
            return 1
        }else {
            return currentPlayer + 1
        }
    }
    else {
        if(currentPlayer <= 1) {
            return playerCount
        }
        else {
            return currentPlayer - 1
        }
    }
}

module.exports = { checkValid, getNextPlayer }