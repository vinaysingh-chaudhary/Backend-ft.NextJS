import dbConnect from "@/database/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { cookieOptioins } from "@/Static/cookieOptions";


dbConnect(); 
export const POST = async(request: NextRequest, response: NextResponse) => {
    try {
        const response = NextResponse.json(
            {
                success: true, 
                message: "User logged Out successfully"
            }, 
            {status: 200}); 


        const token = response.cookies.set("accessToken", "", {
            httpOnly: true,
            expires: new Date(0)
        }); 
        
        return response; 
    } catch (error: any) {
        return NextResponse.json({error: error?.message}, {status: 500})
    }
}