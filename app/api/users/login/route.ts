import dbConnect from "@/database/dbConnect"
import User from "@/models/user.model";
import bcryptjs from 'bcryptjs'
import { NextResponse, NextRequest } from "next/server";
import { cookieOptioins } from "@/Static/cookieOptions";
import jwt from 'jsonwebtoken'


dbConnect();
export const POST= async(request: NextRequest, response: NextResponse ) => {
    try {
        const { email, password } = await request.json();
        
        if(!email && !password)
            return NextResponse.json({error: "Please provide email and password"}, {status: 401});
            
        const user = await User.findOne({email: email})
        if(!user)
               return NextResponse.json({error: "no user found"}, {status: 404}); 
    
    
        const isPasswordCorrect = await bcryptjs.compare(password, user.password); 
        if(!isPasswordCorrect)
               return NextResponse.json({error: "Password is incorrect"}, {status: 200});
    
        
        const generateAccessToken = jwt.sign(
            {
                _id: user?._id
            },
            process.env.ACCESS_TOKEN_SECRET!,
            {expiresIn: '2d'}
            ); 


        const userWithoutPassword = await User.findOne({ email: email }).select(
            "-password -verifyToken -verifyTokenExpiry"
        );
    
        const response = NextResponse.json(
            {
                success: true, 
                message: "User logged in successfully",
                user : userWithoutPassword
            },
            { status:200 }
            );

        response.cookies.set("token", generateAccessToken, cookieOptioins );
        
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error?.message}, {status: 500})
    }
}