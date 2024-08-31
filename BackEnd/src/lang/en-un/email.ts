import dotenv from 'dotenv';
dotenv.config();
const ambientDev = process.env.Ambient_Dev;

// Menssage Email 
export const subjectTokenLogin = ():string => `Verification code.`;
export const bodyTokenLogin = (name: string, email: string, codigo: string):string => `<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: rgb(235, 235, 235);">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
            <td bgcolor="#3F7EAF" style="padding: 20px 0; text-align: center;">
                <h1 style="color: white;">Lorem Ipsum</h1>
                <p style="color: white; font-size: 18px;">E-COMMERCE</p>
            </td>
        </tr>
        <tr>
            <td bgcolor="white" style="padding: 40px 70px;">
                <p style="text-align: center; font-size: 28px; color: #3F7EAF;">Dear ${name},</p>
                <p style="text-align: center;">Your verification code is:</p>
                <h1 style="text-align: center; font-size: 48px; letter-spacing: 7px;">${codigo}</h1>
                <p style="text-align: center;">Your account cannot be accessed without this verification code, even if you have not submitted this request.</p>
                <p style="text-align: center;">Two-factor authentication is a secure way to ensure your registration identity. If you have not requested access to your account, ignore this email and do not share this code with anyone.</p>
                <p style="text-align: center;">${email}</p>
            </td>
        </tr>
        <tr>
            <td bgcolor="#3F7EAF" style="padding: 20px; text-align: center;">
                <p style="color: white;">Hugs, Lorem Ipsum Team.</p>
            </td>
        </tr>
    </table>
</body>
</html>`;