import axios from "axios";
import React,{useState,useEffect} from "react";

import { useNavigate,Link } from "react-router-dom";



const Habits=()=>{
    const [habits,setHabits]=useState([])
    const [newHabitTitle,setNewHabitTitle]=useState('')
    const token=localStorage.getItem('token')
    const navigate=useNavigate()

    const handleAddHabits=async(e)=>{
        e.preventDefault()
        if(!newHabitTitle.trim()) return;
        try{
            const token=localStorage.getItem('token')
            await axios.post('https://onward-api.onrender.com/api/habits',
                {title:newHabitTitle},
                {headers:{Authorization:`Bearer ${token}`}}
                
            )
            setNewHabitTitle('')
            fetchHabits()
        }catch(error){
            console.error("Error adding habit",error)
            alert("Failed to add habit")
        }

    }
    const fetchHabits=async()=>{
        try{
            const token=localStorage.getItem('token')
            if(!token){
                navigate('/login')
            }
            const response=await axios.get('https://onward-api.onrender.com/api/habits',{
                headers:{Authorization:`Bearer ${token}`}
            })
            setHabits(response.data)
        }catch(error){
            console.error("Error fetching habits",error)
        }
    }
    const handleDeleteHabits=async(habitId)=>{
        if(!confirm("Are you sure you want to delete this habit?"))return
        try{
            const token=localStorage.getItem('token')
            await axios.put(`https://onward-api.onrender.com/api/habits/soft-delete/${habitId}`,
                {},
                {headers:{Authorization:`Bearer ${token}`}}
            )
            fetchHabits()
        }catch(error){
            console.error("Error deleting habit",error)
            alert("Failed to delete habit")
        }
    }
    useEffect(()=>{
        fetchHabits();
    },[]);
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            
            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Manage Habits</h1>
                <p className="text-gray-600">Add or remove items from your menu.</p>
            </div>
            
            {/* MAIN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
                
                {/* --- WRAPPER 1 (LEFT ZONE) --- */}
                {/* We add 'flex justify-center' here to center the card in this column */}
                <div className="flex justify-center">
                    
                    {/* THE ADD CARD */}
                    <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md h-fit">
                        <h1 className="text-2xl font-bold mb-6 text-center">Add a Habit</h1>
                        <form onSubmit={handleAddHabits} className="space-y-4">
                            <div>
                                <label htmlFor="habits" className="block text-sm font-medium text-gray-700">Enter Habit</label>
                                <input 
                                    type="text"
                                    id="habits"
                                    name="habits"
                                    required
                                    value={newHabitTitle}
                                    onChange={(e)=>setNewHabitTitle(e.target.value)}
                                    placeholder="e.g. Read Book"
                                    className="border p-2 w-full rounded-md mt-2 border-gray-300 shadow-sm focus:outline-none ring-1 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors duration-200 font-medium"
                            >
                                Add
                            </button>
                        </form>
                    </div>

                </div>

                {/* --- WRAPPER 2 (RIGHT ZONE) --- */}
                {/* We add 'flex flex-col' so the List and the Back Button stack nicely */}
                <div className="flex flex-col gap-4">
                    
                    {/* THE LIST CARD */}
                    <div className="bg-white p-8 rounded-lg shadow-md w-full">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">My Menu</h2>
                        <div className="space-y-2">
                            {habits.length === 0 ? (
                                <p className="text-gray-500 italic">No habits yet. Add one!</p>
                            ) : (
                                habits.map((habit) => (
                                    <div
                                        key={habit.id}
                                        className="p-3 border rounded bg-gray-50 flex justify-between items-center"
                                    >
                                        <span className="font-medium text-gray-700">{habit.title}</span>
                                        <button
                                            onClick={() => handleDeleteHabits(habit.id)}
                                            className="text-red-500 hover:text-white hover:bg-red-500 px-3 py-1 rounded transition-colors duration-200 text-sm font-semibold"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* BACK BUTTON (Inside the Right Wrapper) */}
                    <div className="flex justify-end">
                        <Link
                            to="/dashboard"
                            className="flex text-primary-600 hover:text-primary-700 font-medium hover:underline items-center gap-1"
                        >
                            <span className="mr-2">←</span> Back to Dashboard
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default Habits