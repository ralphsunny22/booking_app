import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

const router = express.Router();

//CREATE
router.post("/", async (req,res,next)=>{
    
    try {
        const newHotel = new Hotel(req.body)
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err)
    }
})

//UPDATE
router.put("/:id", async (req,res,next)=>{
    
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new:true })
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
})

//DELETE
router.delete("/:id", async (req,res,next)=>{
    
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel Deleted Successfully")
    } catch (err) {
        next(err)
    }
})

//GET
router.get("/:id", async (req,res,next)=>{
    
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
})

//GET ALL
router.get("/", async (req,res,next)=>{
    // const failed = true;
    // if (failed) return next(createError(401, "You are not authenticated"));

    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    } catch (err) {
        next(err) //calling error handler in index.js
    }
})



export default router;