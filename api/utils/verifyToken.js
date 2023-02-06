import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token

    if (!token) {
        return next(createError(400, "You are not authenticated"))
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
        if (err) return next(createError(403, "Token is not valid"))
        
        //append "user" key to req array, and equate it to verified user obj above
        req.user = user
        next() 
    })
}

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "User is not valid"))
        }
    })
}

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if (req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "User is not Admin"))
        }
    })
}