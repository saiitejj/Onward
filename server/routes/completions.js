import express from 'express';
import prisma from '../lib/db.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router=express.Router();

router.use(authMiddleware);

router.post('/',async (req,res)=>{
    try{
        const dataFromClient=req.body;
        const habitIdFromClient=dataFromClient.habitId;
        const dateFromClient=dataFromClient.date;
        const userIdFromToken=req.user.userId;
        const newCompletion=await prisma.habitCompletion.create({
            data:{
                date:dateFromClient,
                habitId:habitIdFromClient,
                userId:userIdFromToken,
            },
        })
        res.status(201).json(newCompletion);
    }catch(error){
        console.log(error)
        if(error.code==='P2002'){
            return res.status(409).json({error:'Habit already completed for this date'})
        }
        res.status(500).json({error:'Failed to complete habit'})
    }
})


router.delete('/',async (req,res)=>{
    try{
        const habitIdFromQuery=parseInt(req.query.habitId);
        const dateFromQuery=req.query.date;
        const userIdFromToken = req.user.userId;

        await prisma.habitCompletion.delete({
        where: {
            habitId_userId_date: {
            habitId: habitIdFromQuery,
            userId: userIdFromToken,
            date: dateFromQuery,
            },
        },
        });

        res.status(200).json({ message: 'Habit un-completed successfully' });

    } catch (error) {
        if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Completion record not found' });
        }
        console.log(error);
        res.status(500).json({ error: 'Failed to un-complete habit' });
    }
})

export default router;