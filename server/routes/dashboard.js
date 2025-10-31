import express from 'express'
import prisma from '../lib/db.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router=express.Router();

router.use(authMiddleware);

router.get('/',async (req,res)=>{
    
    try{

        const userIdFromToken=req.user.userId;
        const dateFromQuery=req.query.date;
        const queryDate=new Date(dateFromQuery);

        const habits=await prisma.habit.findMany({
            where:{
                userId:userIdFromToken,
                createdAt:{
                    lte: queryDate,
                },
                OR: [
                {
                    endDate:null,
                },
                {
                    endDate:{
                        gt:queryDate,
                        },
                    },
                ],
            },
            orderBy:{
                createdAt: 'asc',
            },
        })
        const completions=await prisma.habitCompletion.findMany({
            where:{
                userId:userIdFromToken,
                date:dateFromQuery,
            },
            select:{
                habitId:true,
            },
        })

        const completedHabits=new Set(
            completions.map((comp)=>comp.habitId)
        )
        const dashboardList=habits.map((habit)=>{
            return{
                id:habit.id,
                title:habit.title,
                completed:completedHabits.has(habit.id)
            }
        })
        res.status(200).json(dashboardList);
    }catch(error){
        console.log(error)
        res.status(500).json({error:'Failed to fetch dashboard'})

    }

})

export default router;