import mongoose from 'mongoose';

const dbUrl = process.env.MONGODB_URI;
if (!dbUrl) {
    throw new Error('MongoDB connection URL is not defined');
}

let cached = global.mongoose;

if(!cached){
    cached=global.mongoose ={ conn:null, promise: null}
}
export  const connectDB = async () => {
  if( cached.conn){
    return cached.conn
  }

  if(!cached.promise){
    const opts ={
        bufferCommands: true,
        maxPoolSize: 10
    };

    cached.promise = mongoose.connect(dbUrl, opts).then(() => mongoose.connection);
  }


  try{
   cached.conn = await cached.promise
  }
  catch(error){
       cached.promise = null;
       throw error
  }
  return cached.conn;
};
