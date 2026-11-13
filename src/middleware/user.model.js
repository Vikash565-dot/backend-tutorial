import mongoose, {Schema} from 'mongoose';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema ({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String, //will use cloudinary url 
        required: true,


    },
    coverImage: {
        type: string,
        required: true,

    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true,'Password is required']
    },
    refreshToken: {
        type: String

    }
},
{
    timestamps: true
})

userSchema.pre("save", async function (next){ //pre is middleware in mongoose used to run before any data get saved
    //isModified funct in inbuilt in bcrypt feature, same as save function
    if(!this.isModified("password")) return next(); //only runs pre middleware when only password is getting modiefied then save, not when things like pfp getting modified and saved 
    this.password = bcrypt.hash(this.password, 10) //2 params, 1- what needs to be hashed , second is round of hashing  i.e. 10
    next()
})

//custom method in mongoose, we can design 

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password) //compare is inbuilt function in bcrypt which compares the password with hashed password
    //directly returned the function so that it only return true or false
}

userSchema.methods.generateAccessToken = function (){
    //sign method of jwt takes 3 params, 1- payload, 2- secret key, 3- expiry time and basically it used to generate tokens
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { 
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }//expiry param is taken as object, basically ye param object ke andar rakha jaata h 
    )
}
userSchema.methods.generateRefreshToken = function (){
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { 
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }//expiry param is taken as object, basically ye param object ke andar rakha jaata h 
    )
}



export const User = mongoose.model("User", userSchema)


//jwt is bearer token, like a key, those who have the token, that will be authenticated. those who bear the token, they own the key. simple

