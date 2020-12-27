//VARIABLES
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const mail = require('./email')

//DB SETUP
mongoose.connect('mongodb+srv://redus:redis06122002!@cluster0-xwsm9.mongodb.net/sy_project?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDb'))

//MiddleWares
app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

//ROUTES
app.use('/api/users', require('./routes/users'))
app.use('/api/donors', require('./routes/donors'))
app.use('/api/products', require('./routes/products'))
app.use('/api/transactions', require('./routes/transaction'))

// app.get('/', (req, res) => {
//     mail.sendMail({
//         from: 'donationshg@gmail.com',
//         to: 'alidemsi2002@gmail.com',
//         subject: 'AA',
//         text: 'MAMI JOT'
//     }, (err, data) => {
//         if(err)
//             res.json({ status: false })
//         else
//             res.json({ status: true })
//     })
// })


//LISTEN
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))