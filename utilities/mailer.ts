import nodemailer from 'nodemailer'; 
import User from '@/models/user.model';
import { uuid } from 'uuidv4'; 

interface SendTokenMailParams {
    email: string;
    emailType: string;
    userId: string;
}

const sendTokenMail = async({email, emailType, userId} : SendTokenMailParams) => {
    try {

        const generatedToken = uuid(); 

        if(emailType === "VERIFY"){
         await User.findByIdAndUpdate(
            userId,
            {
                verifyToken: generatedToken,
                verifyTokenExpiry: Date.now() + 3600000
            }
        ); 
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPasswordToken: generatedToken, 
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }

        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 2525,
            auth: {
              user: process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASSWORD
            }
          });

        const sentMailResponse = await transport.sendMail({
            from: 'oiiashwry@gmail.com', 
            to: email, 
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Please click <a href="${process.env.DOMAIN}/${emailType==="VERIFY" ? "verifyemail" : "reset-password"}?token=${generatedToken}">here</a> to ${emailType === "VERIFY" ? "verify  your email address." : "reset your password."} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType==="VERIFY" ? "verifyemail" : "reset-password"}?token=${generatedToken} </p>`, 
          });

          return sentMailResponse; 
 
    } catch (error) {
        console.log("(Failed to send token mail)", "error message : ", error )
    }
}

export default sendTokenMail; 