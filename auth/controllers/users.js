let db = require('../../db');
let bcrypt = require('bcrypt-nodejs');
let passport = require('passport');
let userModel = require('../../models/users')


let signup = async (req, res, next) => {
    const hashedPassword = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)

    db.any(`INSERT INTO users ("username","email","password") VALUES ('${req.body.username}', '${req.body.email}','${hashedPassword}')`)
        .then( () => { res.redirect('/index') })
        .catch(e => {
            console.log(e)
            res.redirect('/index')
        }) 
}

let login = passport.authenticate('local', {
    successRedirect: "/index",
    failureRedirect: "/error",
    failureFlash: true
})

let show_users = (req, res, next) => {
    db.any(`SELECT * FROM users`)
        .then( results => {
            res.render('list_users', { result: results })
        })
        .catch(error => {
            console.log(error)
            res.json({ error })
        });
}

module.exports = {
    signup,
    login,
    show_users
}