import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauth", verifyToken, (req,res,next)=>{
//     res.status(200).send("You are authenticated")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.status(200).send("You are verified user by param")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.status(200).send("You are verified admin")
// })

//UPDATE
router.put("/:id", updateUser)

//DELETE
router.delete("/:id", deleteUser)

//GET
router.get("/:id", getUser)

//GET ALL
router.get("/", getAllUser)

export default router;