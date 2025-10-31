import express from "express";
import 'dotenv/config'; 
import cors from "cors"
import authRoutes from "./routes/auth.js";
import habitRoutes from "./routes/habits.js"
import completionRoutes from './routes/completions.js'
import dashboardRoutes from './routes/dashboard.js'

const app=express()
const port=3000;

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello from Onward Server!!')
})


app.use('/api/auth',authRoutes)
app.use('/api/habits',habitRoutes)
app.use('/api/completions',completionRoutes)
app.use('/api/dashboard',dashboardRoutes)

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})