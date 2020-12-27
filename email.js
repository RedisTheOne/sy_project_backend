const nodemailer = require('nodemailer'); 

let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'donationshg@gmail.com', 
        pass: 'hermanimadh'
    } 
}); 

module.exports = mailTransporter;