require('dotenv').config();
const { json } = require('body-parser');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
      api_key:process.env.API_KEY
    }
  }));


exports.sendEmail = async (req,res,next) => {
   const {email, message,name} = JSON.parse(req.body.data)
   
    try {
        transporter.sendMail(
            {
              to: process.env.EMAIL,
              from: process.env.EMAIL,
              subject: 'Website Notification',
              html: `<h1>Message From ${name}</h1>
                     <h2>Email: ${email}</h2>
                     <h3>message: ${message}</h3>` 
            });
    } catch (error) {
        console.log(error)
    }

    return res.status(200).json({message:'email sent successfully'})
}