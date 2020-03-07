const express = require('express');
const router = express.Router();
let user = require('../auth/controllers/users');
const models  = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.user){
        res.render('index', {
            authorized: true,
            username: req.user.username
        });
    }
    else{
        res.render('index', { authorized: false })
    }
});

router.get('/index', function(req, res, next) {
    if(req.user){
        res.render('index', {
            authorized: true,
            username: req.user.username
        });
    }
    else{
        res.render('index', { authorized: false })
    }
});

router.get('/all_users', function(res, res) {
    models.User.findAll().then(users => {
        console.log(users)
    })
})

router.get('/tests', function(res, res) {
    models.Player.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: { id: 2}
    }).then(players => {
        res.render('test', {gameNum: players.dataValues.gameNum})
        console.log(players)
    })
})



module.exports = router;
