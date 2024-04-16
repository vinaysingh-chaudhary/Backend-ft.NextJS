import User from "@/models/user.model";
import sendTokenMail from "@/utilities/mailer";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


export const POST = async(request: NextRequest) => {
    try {
        
        const { token } = await request.json(); 
        if(!token)
            return NextResponse.json({error: "Expired token not found"}, {status: 500}); 

        const user = await User.findOne({
            verifyToken: token,
            isVerified: false
        }); 

        if(!user)
            return NextResponse.json({error: "Either user is verified or Verification code expired"}, {status: 500}); 

     const sendMailRefrence = await sendTokenMail({email: user?.email, emailType : "VERIFY", userId: user?._id}); 
     if(!sendMailRefrence)
        return NextResponse.json({error: "Failed to send verification Code"}, {status: 500});

     return NextResponse.json(
        {
            success: true, 
            message: "new verificaton code sent successfully",
            refrence: sendMailRefrence
        }, {status: 200}); 

    } catch (error: any) {
        return NextResponse.json({message: error?.message},{status: 500});
    }
}