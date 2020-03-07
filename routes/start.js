const {
    NEXT_TURN
} = require('../src/events')
const express = require('express');
const router = express.Router();
const db = require('../db/index')
const models  = require('../models');

router.get(`/:id`, (req, res, next) => {
    models.Player.findOne({where: {gameId: req.params.id, userId: req.user.id}}).then( player => {
        player.update({turn: true}).then( updatedPlayer => {
            models.Game.update({gameStarted: true}, {where: {id: req.params.id}}).then( game => {
                req.app.io.emit(`START_GAME/${req.params.id}`, {playerId: updatedPlayer.dataValues.id})
                res.send({message: "game started"})
            })
        })
    })
})

module.exports = router