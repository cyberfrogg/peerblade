const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: process.env.EMAIL_SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = async (subject: string, content: string, to: string): Promise<void> => {
    await transporter.sendMail({
        from: process.env.EMAIL_SMTP_FROM,
        to: to,
        subject: subject,
        html: content,
    });
}

export default sendEmail;