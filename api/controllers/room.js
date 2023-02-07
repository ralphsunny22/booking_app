import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const createRoom = async (req,res,next)=>{

    const hotel_id = req.params.hotel_id
    try {
        const newRoom = new Room(req.body)
        const savedRoom = await newRoom.save()

        await Hotel.findByIdAndUpdate(hotel_id, {
            $push: { rooms: savedRoom._id }
        })

        res.status(200).json(savedRoom)
    } catch (err) {
        next(err)
    }
}

export const updateRoom = async (req,res,next)=>{
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new:true })
        res.status(200).json(updatedRoom)
    } catch (err) {
        next(err)
    }
}

export const deleteRoom = async (req,res,next)=>{

    const hotel_id = req.params.hotel_id
    try {
        await Room.findByIdAndDelete(req.params.id)

        //remove room from hotel
        await Hotel.findByIdAndUpdate(hotel_id, {
            $pull: { rooms: req.params.id }
        })
        
        res.status(200).json("Room Deleted Successfully")
    } catch (err) {
        next(err)
    }
}

export const getRoom = async (req,res,next)=>{
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (err) {
        next(err)
    }
}

export const getAllRoom = async (req,res,next)=>{
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (err) {
        next(err) //calling error handler in index.js
    }
}