import dbConnect from "@/database/dbConnect";
import User from "@/models/user.model";
import bcryptjs from 'bcryptjs'; 
import sendTokenMail from "@/utilities/mailer";
import { NextResponse, NextRequest } from "next/server";


dbConnect(); 


export const POST = async(request : NextRequest, response: NextResponse) => {
    try {
        const { username, fullName, bio, email, password } = await request.json(); 

        if(!username && !email && !password && !fullName)
            console.log("Provide username, full name , email and password correctly"); 
 
        const existingUser = await User.findOne({email}); 
        if(existingUser)
            return NextResponse.json({error : "User already exists"}, {status: 400}); 

        const salt = await bcryptjs.genSalt(12); 
        const hashedPassword = await bcryptjs.hash(password, salt); 
            
        const registerUser =  await User.create({
            username, 
            fullName, 
            bio, 
            email, 
            password: hashedPassword
        });

        if(!registerUser)
            return NextResponse.json({error : "Failed to register user"}, {status: 401}); 

        //Verify email 
        await sendTokenMail({email, emailType : "VERIFY", userId: registerUser._id }); 

        return NextResponse.json({
            status: 200,
            success: true, 
            messaget : "User registered successfully",
            userDetails : {
                _id: registerUser?._id,
                username: registerUser?.username,
                fullName: registerUser?.fullName,
                bio: registerUser?.bio,
                isVerified: registerUser?.isVerified
            }, 
        })

    } catch (error) {
        return NextResponse.json({error : error}, {status: 500});
    }
}; 