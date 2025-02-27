import mongoose from "mongoose";
const MONGOURI = process.env.MONGOURI!;

if(!MONGOURI){
    throw new Error("MONGOURI is not provided");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = { conn: "", promise: null }
}   

export default async function dbConnect(){
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
       const opts = {
              bufferCommands: true,
              maxPoolSize: 10,
       }

        cached.promise = mongoose.connect(MONGOURI, opts).then(() => mongoose.connection).catch((err) => {
        console.log(err);   
        });
    }
    
   try {
    cached.conn = await cached.promise;
   } catch (error) {
    cached.promise = null;
    throw error;
   }

 return cached.conn;
}