const {
    DRAW_EVENT,
    CARD_PLAYED,
    NEXT_TURN
} = require('../src/events')
const db = require('../db');
const express = require('express');
const router = express.Router();
const models = require("../models")
const validate = require("../backendJS/checkValidCard")

router.get('/game/:id', (req, res, next) => {
    models.Game.findOne({where: {id: req.params.id}}).then( game => {
        models.Player.findOne({where: {gameId: game.dataValues.id, userId: req.user.id}}).then( player => {
            res.render('gamesession', {gameName: game.dataValues.gameName, playerId: player.dataValues.id})
        })
    })
})

router.post('/drawHand/:id', (req, res, next) => {
    models.Game.findOne({where: {id: req.params.id}}).then( game => {
        models.Player.findOne({where: {userId: req.user.id, gameId: game.dataValues.id}}).then( player => {
            models.Card.findAll({where: {playerId: player.dataValues.id, deckId: game.dataValues.deckId, played: false}, order: [['updatedAt']]}).then( hand => {
                res.send(hand)
            })
        })
    })
    .catch(e => console.log(e))
})

router.get('/playCard/:gameId/:cardId', (req, res, next) => {
    models.Game.findOne({where: {id: req.params.gameId}}).then( game => {
        models.Player.findOne({where: {gameId: req.params.gameId, userId: req.user.id}}).then(player => {
            models.Deck.findOne({where: {id: game.dataValues.deckId}}).then (deck => {
                models.Card.findOne({where: {id: deck.dataValues.currentCard}}).then( graveYardCard => {
                    models.Card.findOne({where: {id: req.params.cardId}}).then( card => {

                        //check if it's players turn
                        if(player.dataValues.turn === true) {

                            //check if card matches color/type or is wild
                            if(validate.checkValid(card, graveYardCard)){

                                let position = player.dataValues.position

                                //handle card types
                                switch(card.dataValues.type) {
                                    case 'Reverse':
                                        game.update({reverse: !game.dataValues.reverse}, {where: {id: req.params.gameId}})
                                        break

                                    case 'Skip':
                                            position = validate.getNextPlayer(game.dataValues.reverse, position, game.dataValues.playerCount)
                                        break

                                    case 'Draw Two':
                                        models.Card.findAll({ where:{played: false, playerId: null, deckId: game.dataValues.deckId}, limit: 2 }).then(cards => {
    
                                            position = validate.getNextPlayer(game.dataValues.reverse, position, game.dataValues.playerCount)
    
                                            models.Player.findOne({ where: {gameId: req.params.gameId, position: position}}).then( nextPlayer => {
                                                cards.map(card => {
                                                    card.update({playerId: nextPlayer.dataValues.id})
                                                })
                                                req.app.io.emit(`DRAW_EVENT/${nextPlayer.dataValues.id}`, cards)  
                                            })
                                        })
                                        break

                                    case 'draw4':
                                        models.Card.findAll({ where:{played: false, playerId: null, deckId: game.dataValues.deckId}, limit: 4 }).then(cards => {
    
                                            position = validate.getNextPlayer(game.dataValues.reverse, position, game.dataValues.playerCount)
    
                                            models.Player.findOne({ where: {gameId: req.params.gameId, position: position}}).then( nextPlayer => {
                                                cards.map(card => {
                                                    card.update({playerId: nextPlayer.dataValues.id})
                                                })
                                                req.app.io.emit(`DRAW_EVENT/${nextPlayer.dataValues.id}`, cards)  
                                            })
                                        })
                                        break

                                    default:
                                        break
                                }


                                    card.update({played: true, playerId: null}).then( card => {
                                        models.Deck.update({currentCard: req.params.cardId}, {where: {id: game.dataValues.deckId}}).then( deck => {
                                            player.update({turn: false}, {where: {gameId: req.params.gameId, userId: req.user.id}}).then( _ => {

                                                position = validate.getNextPlayer(game.dataValues.reverse, position, game.dataValues.playerCount)

                                                models.Player.update({turn: true}, {where: {gameId: req.params.gameId, position: position}}).then( _ => {
                                                    models.Player.findOne({where: {turn: true, gameId: req.params.gameId}}).then( nextPlayer => {
                                                        req.app.io.emit(`NEXT_TURN/${game.dataValues.id}`, {playerId: nextPlayer.dataValues.id})
                                                        req.app.io.emit(`CARD_PLAYED/${req.params.gameId}`, {card: card, game: game})
                                                        res.send({sent: true})
                                                    })
                                                })
                                            })
                                        })
                                    })


                            } else{
                                res.send({sent: false})
                            }
                        } else{
                            res.send({sent: false})
                        }
                    })  
                })
            })
        })
    })
})

router.get('/graveyard/:id', (req, res, next) => {
    models.Game.findOne({where: {id: req.params.id}}).then( game => {
        models.Deck.findOne({where: {id: game.dataValues.deckId}}).then(deck => {
            models.Card.findOne({where: {id: deck.currentCard, deckId: deck.dataValues.id}}).then( card => {
                if(card === null){
                    models.Card.findOne({where: {deckId: deck.dataValues.id, played: false, playerId: null}}).then( card => {
                    //models.Card.findOne({where: {deckId: deck.dataValues.id, played: false, playerId: null}}).then( card => {
                        deck.update({currentCard: card.dataValues.id}).then( deck => {
                            card.update({played: true}).then( card => {
                                res.send({card: card, game: game})
                            })
                        })
                    })
                }else{
                    res.send({card: card, game: game})
                }
            })
        })
    })
})

router.get('/drawCard/:id', (req,res, next) => {
    models.Game.findOne({where: {id: req.params.id}}).then( game => {
        models.Deck.findOne({where: {id: game.dataValues.deckId}}).then(deck => {

            models.Player.findOne({where: {gameId: game.dataValues.id, userId: req.user.id}}).then(player => {
                if (player.dataValues.turn === true) {
                    models.Card.findOne({
                        where: {
                            played: false,
                            deckId: game.dataValues.deckId,
                            playerId: null
                        }
                    }).then(card => {
                        if(isDeckEmpty(game, deck, card)) {
                            console.log("true")
                            models.Card.findAll({where: {played: true, deckId: game.dataValues.deckId}})
                              .then(discards => {
                                  let graveyardCard = []
                                  let numOfCard = 0
                                  discards.map(discards =>{
                                      console.log(discards.dataValues.id + " " + discards.dataValues.color )
                                      graveyardCard[numOfCard] = discards.dataValues.id
                                      numOfCard = numOfCard + 1;
                                  })
                                  //-----------
                                  shuffleGraveyard(graveyardCard)
                                  for (i = 0; i < numOfCard; i++) {
                                      models.Card.findOne({where: {id: graveyardCard[i], deckId: game.dataValues.deckId}})
                                        .then(card => {
                                            card.update({played: false})
                                            //console.log(card)
                                        })
                                  }
                                    deck.update({cardLeft: numOfCard})
                                  //---------------

                              })

                        } else {
                            deck.update({cardLeft: deck.dataValues.cardLeft - 1})
                            card.update({playerId: player.dataValues.id}).then(card => {
                                res.send({sent: true, card: card})
                            })
                        }
                    })
                } else {
                    res.send({sent: false})
                }
            })
        })
    })
})

function isDeckEmpty(game, deck, card){
    console.log(deck.dataValues.cardLeft)
    if (deck.dataValues.cardLeft == 0){
        return true
    }

    return false
}

function shuffleGraveyard(graveyardCard){
    let counter = graveyardCard.length,
      temp, i;

    while (counter) {
        i = Math.floor(Math.random() * counter--);
        temp = graveyardCard[counter];
        graveyardCard[counter] = graveyardCard[i];
        graveyardCard[i] = temp;
    }
}


module.exports = router