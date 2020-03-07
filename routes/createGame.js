const express = require('express');
const router = express.Router();
const models = require('../models')


/* game session page. */
router.post('/create', function(req, res, next) {

    //create new column in game table with name
    models.Game.create({gameName: req.body.name}).then( game => {

        //create new chat with gameId
        models.Chat.create({chatName: game.dataValues.gameName}).then( chat => {
            
            //create new deck
            models.Deck.create({cardLeft: 23-1}).then( deck => {
                //console.log(deck.dataValues.cardLeft)
                //update game table with chat id and deck id
                models.Game.update({ chatId: chat.dataValues.id, deckId: deck.dataValues.id }, {where: {id: game.dataValues.id}}).then( _ => {

                    //create an array of card objects and shuffle it
                    let cardArry = createDeck()
                    shuffle(cardArry)

                    //insert each card into the cards database table with deckId associated with game
                    cardArry.map( card => {
                        models.Card.create({type: card.value, color: card.color, deckId: deck.dataValues.id, played: false})
                    })
                    // req.app.io.emit("gameCreated") --implement to update lobby on game creation
                    res.redirect(`/join/${game.dataValues.id}`)
                })  
            })
        })
    })
    .catch(e => console.log(e))
});

const createDeck = () => {
    //let colors = ['--red', '--blue', '--green', '--yellow'];
    //let values = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 'Draw Two', 'Draw Two', 'Skip', 'Skip', 'Reverse', 'Reverse'];
    //let wildDeck = ['wild', 'wild', 'wild', 'wild', 'draw4', 'draw4', 'draw4', 'draw4']
    let colors = ['--yellow', '--red'];
    let values = [ 1,1,1,1,1,1,1,1,1,1,1];
    let wildDeck = ['wild']
    let deck = [];

    for (let color of colors) {
        for (let value of values) {
            deck.push( {color: color, value: value} );
        }
    }

    for (let wild of wildDeck) {
        deck.push( {color: "", value: wild} )
    }

    return deck;
}

const shuffle = (deck) => {
    let counter = deck.length,
        temp, i;

    while (counter) {
        i = Math.floor(Math.random() * counter--);
        temp = deck[counter];
        deck[counter] = deck[i];
        deck[i] = temp;
    }
}



module.exports = router;