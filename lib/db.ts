// import mongoose from 'mongoose';

// const dbUrl = process.env.URL;
// if (!dbUrl) {
//     throw new Error('MongoDB connection URL is not defined');
// }

// let cached = global.mongoose;

// if(!cached){
//     cached=global.mongoose ={ conn:null, promise: null}
// }
// export  const connectDB = async () => {
//   if( cached.conn){
//     return cached.conn
//   }

//   if(!cached.promise){
//     const opts ={
//         bufferCommands: true,
//         maxPoolSize: 10
//     };

//     cached.promise = mongoose.connect(dbUrl, opts).then(() => mongoose.connection);
//   }


//   try{
//    cached.conn = await cached.promise
//   }
//   catch(error){
//        cached.promise = null;
//        throw error
//   }
//   return cached.conn;
// };



// lib/mongodb.ts
import { MongoClient, ServerApiVersion } from "mongodb";


if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;


let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}



if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
