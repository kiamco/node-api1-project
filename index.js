// implement your API here
const express = require('express');
const db = require('./data/db');

//init server
const server = express();

server.use(express.json());


server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    const {
        id
    } = req.params;

    db.findById(id)
        .then(user => {
            res.status(200).json({
                success: true,
                user
            })
        })
        .catch(err => {
            res.status(200).json({
                success: false,
                err
            })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const {
        id
    } = req.params;

    db.remove(id)
        .then(user => {
            res.status(204).json({
                message: `user with id:${id} is deleted`
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'id not found',
                err
            })
        })
})

server.post('/api/users', (req, res) => {
    const body = req.body;
    db.insert(body)
        .then(info => {
            info ?
                res.status(201).json({
                    success: true,
                    info
                }) :
                res.status(404).json({
                    success: false,
                    message: `"Please provide name and bio for the user."`
                })

        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err
            })
        })
})

server.put('/api/users/:id', (req, res) => {
    const {
        id
    } = req.params;
    const info = req.body;

    db.update(id, info)
        .then(updatedInfo => {
            updatedInfo
                ?
                res.status(200).json({
                    success: true,
                    message: `user with id:${id} is updated`,
                    info
                }) :
                res.status(404).json({
                    success: false,
                    message: `"Please provide name and bio for the user."`
                })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err
            })
        })
})

//assign a prot to listen
server.listen(5000, () => {
    console.log('server is running')
})