// const nodemailer = require("nodemailer");

// async function main(to,subject,html) {

// //   let testAccount = await nodemailer.createTestAccount();

//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//     auth: {
//       user: "maazafzaal1914@gmail.com",
//       pass: "ehagxodaeislakyd",
//     },

//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: 'a4computing@gmail.com', // sender address
//     to, // list of receivers
//     subject, // Subject line
//     html, // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   return info;
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// module.exports = main;
