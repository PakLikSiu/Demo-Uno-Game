const socketIo = require('socket.io')
const {
    USER_JOINED,
    MESSAGE_SEND
} = require('../src/events')
const db = require('../db')
const models  = require('../models');


const init = (app, server) => {
    const io = socketIo(server) //mount socket server to http server

    app.io = io

    io.on('connection', socket => {
        console.log('client connected')

        socket.on('disconnect', data => {
            console.log('client disconnected')
        })

        socket.on(USER_JOINED, data => io.emit(USER_JOINED, data))
        
    })
}

module.exports = {
    init
}