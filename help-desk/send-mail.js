const nodemailer = require('nodemailer');
const sendMail = async (ticketId, body) => {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
         debug: true // Enable debug mode

    });

    const {name, department, date, time, issue, comment} = body;

    // Set up email data
    let mailOptions = {
        from: process.env.EMAIL_FROM,
        to: ['sakthivel.v@certaworks.in', 'gnanaprabhu@certaworks.in', 'ajay.a@certaworks.in'],
        subject: `${ticketId} - ${issue} - ${name}`,
        html: `
        Hi Team,<br>
        Ticket Id: <b>${ticketId}</b><br>
        Requster Name: <b>${name}</b><br>
        Department: <b>${department}</b><br>
        Date: <b>${date}</b><br>
        Time: <b>${time}</b><br>
        Time: <b>${issue}</b><br>
        Time: <b>${comment}</b><br>
        `
    };

    console.log(mailOptions, process.env.EMAIL_USER, process.env.EMAIL_PASS)

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
}

module.exports = { sendMail }