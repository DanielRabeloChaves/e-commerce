import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587', 10), 
    secure: process.env.EMAIL_SECURE === 'true', // Converter string para booleano
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
});

interface EmailData {
    to: string;
    subject: string;
    html?: string;
}

async function sendEmail(data: EmailData) {
    try {
        const info = await transporter.sendMail({
        from: `E-COMMERCE <${process.env.EMAIL_USER}>`, // Corrigido para EMAIL_USER
        to: data.to,
        subject: data.subject,
        text: "",
        html: data.html,
        });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export { sendEmail };