import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express()
dotenv.config();

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb")
    } catch (error) {
        throw error;
    }
};

app.listen(8800, ()=>{
    connect()
    console.log('connected backend successfully!')
})