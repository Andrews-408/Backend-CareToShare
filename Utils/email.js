const nodemailer = require('nodemailer')

const sendEmail = async options => {
    // define transport
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    //define the email options
    const mailOptions = {
        from: 'Care To Share <yeboahandrews408@gmail.com>',
        to: options.email,
        subject: options.subject,
        text : options.message,
        html : `<p>Click <a href="http://localhost:3000/login/forgotPassword/resetPassword/${options.message}">here</a> to access the app and reset your password. If you didn't forget your password, please ignore this email </p>`
    }


    // actuall send the email

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;