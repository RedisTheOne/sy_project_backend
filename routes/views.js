const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Donor = require('../models/Donor')

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/lista/njerez-ne-nevoje', async (req, res) => {
    const users = await User.find({}).lean()
    res.render('lista/njerezNeNevoje', {
        user: {
            name: 'aa'
        },
        users: users,
        length: users.length
    })
})

router.get('/lista/donator', async (req, res) => {
    const donors = await Donor.find({}).lean()
    res.render('lista/donator', {
        donors,
        length: donors.length
    })
})

router.get('/shto/njerez-ne-nevoje', (req, res) => res.render('shto/njerezNeNevoje'))
router.get('/shto/donator', (req, res) => res.render('shto/donator'))

router.get('/fshi/njerez-ne-nevoje', async (req, res) => {
    const users = await User.find({}).lean()
    res.render('fshi/njerezNeNevoje', {
        users: users
    })
})

router.get('/fshi/donator', async (req, res) => {
    const users = await Donor.find({}).lean()
    res.render('fshi/donator', {
        users
    })
})

router.get('/modifiko/njerez-ne-nevoje', async (req, res) => {
    const users = await User.find({}).lean()
    res.render('modifiko/njerezNeNevoje', {
        users: users
    })
})

router.get('/modifiko/njerez-ne-nevoje/:number', async (req, res) => {
    const user = await User.findOne({ number: req.params.number }).lean()
    res.render('modifiko/njeriNeNevoje', {
        user,
        number: req.params.number
    })
})

router.get('/modifiko/donator', async (req, res) => {
    const users = await Donor.find({}).lean()
    res.render('modifiko/donator', {
        users: users
    })
})

router.get('/modifiko/donator/:username', async (req, res) => {
    const user = await Donor.findOne({ username: req.params.username }).lean()
    res.render('modifiko/njeDonator', {
        user,
        username: req.params.username
    })
})

module.exports = router