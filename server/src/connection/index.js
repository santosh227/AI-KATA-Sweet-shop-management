import mongoose from "mongoose";
import dotenv from "dotenv"

// MONGODB connection function 
const database_conn = async ()=>{
    try{
         await mongoose.connect(process.env.MONGO_URI)

         console.log("database connected successfully");
         
    }catch(err){
         console.log("database not connected : ", err.message)
         process.exit(1);
    }
}

export default database_conn