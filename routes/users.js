const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Products = require('../models/Product')
const Transaction = require('../models/Transaction')

//GET USERS
router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.json(users)
        })
})

//GET USER
router.get('/:id', async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    const products = await Products.find({ status: true }).sort({ created_at: -1 })
    const transactions = await Transaction.find({ user_number: user.number }).sort({ createdAt: -1 })
    res.json({ user, products, transactions })
})

//CREATE USER
router.post('/create', async (req, res) => {
    //CHECK IF ALL THE FIELDS ARE INCLUDED
    if(req.body.name && req.body.surname && req.body.address && req.body.password && req.body.description && req.body.email && req.body.phone_number) {
        //GET THE LATEST NUMBER
        const lastUser = await User.findOne({}).sort({ created_at: -1 })
        //CREATE USER
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            address: req.body.address,
            number: lastUser.number + 1,
            password: req.body.password,
            description: req.body.description,
            created_at: Date.now(),
            email: req.body.email,
            phone_number: req.body.phone_number
        })
        //SAVE USER
        user
            .save()
            .then(() => {
                res.json({
                    status: true,
                    msg: 'User created successfully'
                })
            })
    } else
        res.json({
            status: false,
            msg: 'Plase fill required fields'
        })
})

//LOGIN
router.post('/login', (req, res) => {
    //CHECK IF ALL THE FIELDS ARE INCLUDED
    if(req.body.number && req.body.password) {
        //FIND AND SEND USER
        User
            .findOne({number: req.body.number, password: req.body.password})
            .then(user => {
                if(user) {
                    res.send({
                        status: true,
                        msg: 'Successfully signed in',
                        id: user._id
                    })
                } else
                    res.send({
                        status: false,
                        msg: "User doesn't exist"
                    })
            })
    } else
        res.json({
            status: false,
            msg: 'Plase fill required fields'
        })
})

//REMOVE
router.delete('/remove', (req, res) => {
    if(req.body.number) {
        User
            .deleteOne({number: req.body.number})
            .then(() => {
                res.json({
                    status: true,
                    msg: 'User deleted successfully'
                })
            })
    } else
        res.json({
            status: false,
            msg: 'Plase fill required fields'
        })
})

module.exports = router