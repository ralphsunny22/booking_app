import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
        
        const token = jwt.sign({ id:user._id, isAdmin:user.isAdmin }, process.env.JWT_SECRET_KEY)

        const { password, isAdmin, ...otherDetails } = user._doc
        //show only otherDetails
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({...otherDetails})
    } catch (err) {
        next(err)
    }
}