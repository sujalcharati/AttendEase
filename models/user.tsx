import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
         username :{
            type :String,
            require : true,
            unique :true

         },
         password :{
            type :String,
            require : true,
            minlength :6
        },
         email :{
            type :String,
            require : true,
            unique :[true,'enter a valid email']
        },
       

})

const User =mongoose.model('User',userSchema);
export default User

