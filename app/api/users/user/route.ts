import { NextRequest, NextResponse,  } from "next/server";
import verifyJWT from '../../../../utilities/verifyJWT'
import User from "@/models/user.model";

export const GET = async(request: NextRequest) => {
    try {
        const userId = await verifyJWT(request); 
    
        if(!userId)
            return NextResponse.json({error: "No user logged In"}, {status: 401});
        
        const user = await User.findById(userId).select("-password -verifyToken -verifyTokenExpiry"); 
        if(!user)
             return NextResponse.json({error: "User doesn't exists"}, {status: 500}); 
    
        return NextResponse.json(
            {
                success: true, 
                message: "User details fetched successfully",
                user
            },
            {status: 200}
        )
    } catch (error : any) {
        return NextResponse.json(
            {
                error: error.message
            },
            {status: 500}
        )
    }
}