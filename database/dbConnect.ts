import mongoose from "mongoose"

const dbConnect = async() =>{
    try {

        await mongoose.connect(process.env.MONGO_URI!); 
        const connection = mongoose.connection; 

        connection.on("connected", () => {
            console.log("Database is connected successfully"); 
        }); 

        connection.on("error", (err) => {
            console.log("(Error while connecting to database, make sure database is Up and Running)", "error message : ", err);  
            process.exit(); 
        }); 

    } catch (error) {
        console.log("(Failed to connect to database)", "error message : ", error);
    }
} 

export default dbConnect