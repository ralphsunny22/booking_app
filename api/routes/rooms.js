import express from "express";

const router = express.Router();

//CREAT
router.post("/", (req,res)=>{
    res.send("Hello rooms")
})
router.get("/", (req,res)=>{
    res.send("Hello rooms")
})

export default router;