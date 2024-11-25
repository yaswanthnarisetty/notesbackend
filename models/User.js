import mongoose from 'mongoose';

const userScheme = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String
});



export default mongoose.model('users', userScheme);