import { NextRequest } from "next/server"
import jwt from 'jsonwebtoken'

const verifyJWT = (request: NextRequest) => {
    try {

        const token = request.cookies.get("accessToken")?.value || ""
        if(token === "")
                throw new Error("token isn't present"); 

        const decodedToken: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
        return decodedToken._id
         
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export default verifyJWT; 