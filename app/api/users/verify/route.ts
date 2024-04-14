import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import User from "@/models/user.model";

dbConnect();
export const POST = async(request: NextRequest, response: NextResponse) => {
   try {
    
        const { token } = await request.json(); 
        if(!token)
            return NextResponse.json({error: "token isn't available"}, {status: 200}); 
    
        const user = await User.findOne(
            {
                verifyToken : token, 
                verifyTokenExpiry : { $gt: Date.now()}
            }
        )
    
        if(!user)
            return NextResponse.json({error: "Verification code is expired"}, {status: 500}); 
    
        const updatedUserRefrence = await User.findByIdAndUpdate(
            user?._id,
            {
                isVerified: true,
                $unset: {
                    verifyToken: 1,
                    verifyTokenExpiry: 1
                }
            },
            {
                new: true
            }
        ).select("-password "); 
    
        if(!updatedUserRefrence)
                return NextResponse.json({error: "Failed to verify user"}, {status: 500}); 
    
        return NextResponse.json(
            {
                success: true,
                message: "User verified successfully",
                isVerified : updatedUserRefrence?.isVerified,
            },
            {status: 200}
        )
   } catch (error: any ) {
    return NextResponse.json({error: error?.message}, {status: 500})
   }
}