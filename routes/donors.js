const express = require('express')
const router = express.Router()
const Donor = require('../models/Donor')
const Product = require('../models/Product')
const Transaction = require('../models/Transaction')

//GET DONORS
router.get('/', (req, res) => {
    Donor
        .find()
        .then(donors => {
            res.json(donors)
        })
})

//GET DONOR
router.get('/:id', async (req, res) => {
    const donor = await Donor.findOne({ _id: req.params.id })
    const products = await Product.find({ donor_username: donor.username }).sort({ created_at: -1 })
    const transactions = await Transaction.find({ donor_username: donor.username }).sort({ createdAt: -1 })
    res.json({ donor, products, transactions })
})

//CREATE DONOR
router.post('/create', (req, res) => {
    //CHECK IF ALL THE FIELDS ARE INCLUDED
    if(req.body.name && req.body.surname && req.body.address && req.body.username && req.body.password) {
        //CHECK IF NUMBER IS TAKEN
        Donor
            .findOne({username: req.body.username})
            .then(u => {
                if(!u) {
                    //CREATE DONOR
                    const donor = new Donor({
                        name: req.body.name,
                        surname: req.body.surname,
                        address: req.body.address,
                        username: req.body.username,
                        password: req.body.password
                    })
                    //SAVE DONOR
                    donor
                        .save()
                        .then(() => {
                            res.json({
                                status: true,
                                msg: 'Donor created successfully'
                            })
                        })
                } else
                    res.json({
                        status: false,
                        msg: 'This username is already taken'
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
    if(req.body.username && req.body.password) {
        //FIND AND SEND DONOR
        Donor
            .findOne({username: req.body.username, password: req.body.password})
            .then(donor => {
                if(donor) {
                    res.send({
                        status: true,
                        msg: 'Successfully signed in',
                        id: donor._id
                    })
                } else
                    res.send({
                        status: false,
                        msg: "Donor doesn't exist"
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
    if(req.body.username && req.body.password) {
        Donor
            .deleteOne({username: req.body.username, password: req.body.password})
            .then(() => {
                res.json({
                    status: true,
                    msg: 'Donor deleted successfully'
                })
            })
    } else
        res.json({
            status: false,
            msg: 'Plase fill required fields'
        })
})

module.exports = router