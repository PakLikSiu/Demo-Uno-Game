let LocalStrategy = require('passport-local').Strategy;
let bcrypt = require('bcrypt-nodejs');
let db = require('../db');

const validPassword = (password, user) => {
    return bcrypt.compareSync(password, user.password); // compare the bcrypted password to the real password (hash value)
}
module.exports = (passport, getUserByEmail, getUserById) => {
    
    const authenticateUser = (req, email, password, done) => {
        db.any(`select * from users where (email = '${req.body.email}')`)
            .then(user => {
                if (Object.keys(user).length === 0) {
                    console.log(Object.keys(user).length)
                    console.log('no user')
                    //req.flash('message', 'Incorrect username')
                    return done(null, false)
                } else if (req.body.password == null || req.body.password == undefined) {
                    console.log('no password')
                    //req.flash('message', 'no password')
                    return done(null, false)
                } else if (!validPassword(req.body.password, user[0])) {
                    console.log('password incorrect')
                    //req.flash('message', 'no password')
                    return done(null, false)
                } else{
                    return done(null, user[0])
                }
            }).catch(e => {
                console.log(e)
            })
    }

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, authenticateUser))


    passport.serializeUser((user, done) => {
        return done(null, user)
    })
    passport.deserializeUser((user, done) => {
        return done(null, user)
    })
}