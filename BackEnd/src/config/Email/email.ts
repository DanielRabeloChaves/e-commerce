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
    text?: string;
    html?: string;
}

async function sendEmail(data: EmailData) {
    try {
        const info = await transporter.sendMail({
        from: `UPX5 <${process.env.EMAIL_USER}>`, // Corrigido para EMAIL_USER
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.html,
        });
        return info;
    } catch (err) {
        console.error(err);
        return { error: "Erro na tentativa de envio de E-mail" };
    }
}

export { sendEmail };