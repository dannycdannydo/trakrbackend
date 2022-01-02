const nodemailer = require("nodemailer");

async function send(data) {
    return new Promise(async function(resolve, reject)
    {
        const email = {
            from: data.from,
            to: data.recipient,
            subject: data.subject,
            text: data.text,
            html: `<p>${data.text}</p>`
        }
        let transport = await nodemailer.createTransport({
            host: 'smtp.office365.com',
            secureConnection: false,
            pool: true,
            maxConnections:1,
            maxMessages: 1,
            port: 587,
            tls: {
                ciphers:'SSLv3'
            },
            auth: {
                user: data.user, 
                pass: data.pword,
            },
        })
        const result = await transport.sendMail(email)
        resolve(result)
    })
}

module.exports.send = send