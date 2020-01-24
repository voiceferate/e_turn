// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',               //name of email provider
//     auth: {
//         user: 'vanyavi06@gmail.com',       // sender's gmail id
//         pass: '!Q2w3e4r++ivan91'     // sender password
//     }
// });


// var mailOptions = {
//     from: 'sender@gmail.com',                   // sender's gmail
//     to: 'receiver@gmail.com' ,                  // receiver's gmail
//     subject: 'Sending Email using Node.js',     //subject
//     text: 'That was easy!'                      //message Description
// };

// //send mail using transport object’s sendMail() function
// transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });


// // module.exports = transporter.sendMail(mailOptions, function (error, info) {
// //     if (error) {
// //         console.log(error);
// //     } else {
// //         console.log('Email sent: ' + info.response);
// //     }
// // });

