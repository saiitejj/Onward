import React,{useState,useEffect, use} from 'react'

import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'

const Habits=()=>{
    const navigate=useNavigate()
    const [habits,setHabits]=useState([])
    const [newHabitTitle,setNewHabitTitle]=useState('')
    
    const fetchHabits=async()=>{
        try{
            const token=localStorage.getItem('token')
            if(!token){
                navigate('/login')
                return
            }
            const response=await axios.get(`http://localhost:3000/api/habits`,{
                headers:{Authorization:`Bearer ${token}`}
            })
            setHabits(response.data)
        }catch(error){
            console.error("Error fetching habits",error)
        }
    }

    useEffect(()=>{
        fetchHabits();
    },[])

    const handleAddHabit = async (e) => {
        e.preventDefault(); // Stop page refresh
        try {
            const token = localStorage.getItem('token');
            
            await axios.post('http://localhost:3000/api/habits', 
                { title: newHabitTitle },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            setNewHabitTitle(''); 
            fetchHabits();       
            alert("Habit Added!");
            
        } catch (error) {
            console.error("Error adding habit", error);
        }
    };

    const handleDeleteHabit = async (id) => {
        if(!confirm("Are you sure you want to stop tracking this habit?")) return;

        try {
            const token = localStorage.getItem('token');
            
            await axios.put(`http://localhost:3000/api/habits/soft-delete/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            fetchHabits();
            
        } catch (error) {
            console.error("Error deleting habit", error);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto">
                
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Manage Habits</h1>
                    <Link to="/dashboard" className="text-primary-600 hover:underline font-medium">
                        ← Back to Dashboard
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                    <form onSubmit={handleAddHabit} className="flex gap-4">
                        <input 
                            type="text"
                            value={newHabitTitle}
                            onChange={(e) => setNewHabitTitle(e.target.value)}
                            placeholder="e.g., Read for 30 mins"
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                        <button 
                            type="submit"
                            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors"
                        >
                            Add
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    
                    {habits.length === 0 ? (
                        <p className="p-8 text-center text-gray-500">You haven't created any habits yet.</p>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {habits.map(habit => (
                                <div key={habit.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                                    
                                    <span className="font-medium text-gray-800 text-lg">
                                        {habit.title}
                                    </span>
                                    
                                    <button 
                                        onClick={() => handleDeleteHabit(habit.id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-semibold px-3 py-1 rounded hover:bg-red-50 transition-colors"
                                    >
                                        Delete
                                    </button>

                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
export default Habits