const mail = require('../email')
const express = require('express')
const app = express.Router()
const Product = require('../models/Product')
const Donor = require('../models/Donor')
const User = require('../models/User')
const Transaction = require('../models/Transaction')

async function sendMail(email, text, subject) {
    mail.sendMail({
        from: 'donationshg@gmail.com',
        to: email,
        text,
        subject
    }, (err, data) => {
        if(err)
            return false
        return true
    })
}

app.get('/', async (req, res) => {
    const transactions = await Transaction.find({})
    res.json({transactions});
})

//MAKE TRANSACTION
app.post('/', async (req, res) => {
    if(req.body.product_id && req.body.donor_username && req.body.user_id) {
        const product = await Product.findOne({ _id: req.body.product_id })
        const donor = await Donor.findOne({ username: req.body.donor_username })
        const user = await User.findOne({ _id: req.body.user_id })
        if(product && donor && user) {
            await sendMail(user.email, `Produkti me titull '${product.header}' do ju vij brenda javes ne adresen e caktuar.`, 'PRODUKTI U POROSIT ME SUKSES')
            await sendMail(donor.email, `Produkti me titull '${product.header}' u porosit nga ${user.name} ${user.surname}. Ju lutem paraqiteni ate prane zyrave tona brenda 5 ditesh.`, `'${product.header.toUpperCase()}' SAPO U POROSIT`)
            await Product.deleteOne({ _id: product._id })
            const transaction = new Transaction({
                product_header: product.header,
                product_quantity: product.quantity,
                donor_username: donor.username,
                user_number: user.number,
                createdAt: Date.now()
            })
            transaction
                .save()
                .then(() => res.json({ status: true, msg: 'Product was submitted successfully' }))
        } else
            res.json({ status: false, msg: 'Data is not valid' })
    } else
        res.json({ status: false, msg: 'Please fill required fields' })
})

module.exports = app