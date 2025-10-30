import express from "express";
import prisma from "../lib/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const router=express.Router()

router.get('/',(req,res)=>{
    res.send("Hiii")
})

router.post('/register', async (req,res)=>{
    try{
        const {username,password}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser= await prisma.user.create({
            data:{
                username: username,
                password: hashedPassword,
            },
        });
        res.status(201).json(newUser);
    } catch(error){
        console.log(error);
        res.status(500).json({error:' Something went wrong'});
    }
})

router.post('/login', async (req,res)=>{
    try{
        const {username,password}=req.body;
        const existingUser= await prisma.user.findUnique({
            where:{
                username: username,
            },
        });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const payload={
            userId:existingUser.id,
            username:existingUser.username,
        };
        const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:'1d',
        })

        res.status(200).json({token:token});
    } catch(error){
        console.log(error);
        res.status(500).json({error:' Something went wrong'});
    }
})



export default router;