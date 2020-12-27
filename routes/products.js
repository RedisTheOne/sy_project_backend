const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Donor = require('../models/Donor')

//GET PRODUCTS
router.get('/', (req, res) => {
    Product
        .find({ status: true })
        .sort({ created_at: -1 })
        .then(products => {
            res.json({products})
        })
})

//GET PRODUCT
router.get('/:id', (req, res) => {
    Product
        .findOne({ _id: req.params.id })
        .then(product => {
            res.json({product})
        })
})

//CREATE PRODUCT
router.post('/add', (req, res) => {
    //CHECK IF ALL FIELDS ARE INCLUDED
    if(req.body.header && req.body.description && req.body.quantity && req.body.donor_username) {
        //CHECK IF DONOR EXISTS
        Donor
            .findOne({username: req.body.donor_username})
            .then(donor => {
                if(donor) {
                    const product = new Product({
                        header: req.body.header,
                        description: req.body.description,
                        quantity: req.body.quantity,
                        donor_username: req.body.donor_username,
                        created_at: Date.now()
                    })
                    product
                        .save()
                        .then((product) => {
                            res.json({
                                status: true,
                                msg: 'Product added successfully',
                                product
                            })
                        })
                } else
                    res.json({
                        status: false,
                        msg: 'Donor does not exist'
                    })
            })
    } else
        res.json({
            status: false,
            msg: 'Plase fill required fields'
        })
})

//DELETE PRODUCT
router.post('/delete/:id', (req, res) => {
    Product
        .deleteOne({ _id: req.params.id })
        .then(() => res.json({ status: true, msg: 'Product delete successfully' }))
})

//CHANGE PRODUCT STATUS
router.post('/:id/change/status', (req, res) => {
    Product
        .updateOne({ _id: req.params.id }, { status: req.body.new_status })
        .then(() => res.json({ status: true, msg: 'Product status changed successfully' }))
})

module.exports = router