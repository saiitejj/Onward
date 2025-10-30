import express from 'express';
import prisma from '../lib/db.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router=express.Router();


router.use(authMiddleware);

router.get('/test',(req,res)=>{
    res.send(`Hello, ${req.user.username}! Your ID is ${req.user.userId}.`)
})

router.post('/',async (req,res)=>{
    try{
        const dataFromClient=req.body;
        const newHabitTitle=dataFromClient.title;

        const userIdFromToken=req.user.userId;

        const newHabit=await prisma.habit.create({
            data:{
                title:newHabitTitle,
                userId:userIdFromToken,
            }
        })
        res.status(201).json(newHabit);
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Failed to create habit'})
    }
})


router.get('/',async (req,res)=>{
    try{
        const userIdFromToken=req.user.userId;
        const habits=await prisma.habit.findMany({
            where:{
                userId:userIdFromToken,
            },
            orderBy:{
                createdAt:'asc',
            },
        })
        res.status(200).json(habits);
    }catch(error){
        console.log(error)
        res.status(500).json({error:'Failed to fetch habits'})
    }
})

router.put('/:id',async (req,res)=>{
    try{
        const habitIdToUpdate=parseInt(req.params.id);
        const dataFromClient=req.body;
        const newTitle=dataFromClient.title;
        const userIdFromToken=req.user.userId;
        const habit=await prisma.habit.findUnique({
            where:{
                id:habitIdToUpdate,

            },
        })
        if(!habit){
            return res.status(404).json({error:'Habit not found'});
        }
        if (habit.userId!==userIdFromToken){
            return res.status(403).json({error:'Forbidden: You do not own this habit'});
        }
        const updatedHabit=await prisma.habit.update({
            where:{
                id:habitIdToUpdate,
            },
            data:{
                title:newTitle,
            }
        })
        res.status(200).json(updatedHabit);
    }catch(error){
        console.log(error)
        res.status(500).json({error:'Failed to update habit'})
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const habitIdToDelete=parseInt(req.params.id);
        const userIdFromToken=req.user.userId;
        const habit=await prisma.habit.findUnique({
            where:{
                id:habitIdToDelete,
            },
        })
        if (!habit){
            return res.status(404).json({error:"Habit not fount"});
        }
        if(habit.userId!==userIdFromToken){
            return res.status(403).json({error:"Forbidden: You do not own this habit"})
        }
        await prisma.habit.delete({
            where:{
                id:habitIdToDelete,
            },
        })
        res.status(200).json({message:'Habit deleted successfully'})
    } catch(error){
        console.log(error);
        return res.status(500).json({error:'Failed to delete habit'})
    }
})


export default router;