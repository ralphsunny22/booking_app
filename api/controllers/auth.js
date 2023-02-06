import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";

export const register = async (req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save()
        res.status(200).json("User Created Succesfully")
    } catch (err) {
        next(err)
    }
}

export const login = async (req,res,next)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if (!user) return next(createError(404, "User not found"))
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(404, "Incorrect Password"))
        
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}