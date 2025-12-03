import React,{useState,useEffect} from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import {format} from 'date-fns'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'


const Dashboard=()=>{
    const navigate=useNavigate()
    
    const [habits,setHabits]=useState([])
    const [selectedDate,setSelectedDate]=useState(new Date())

const toggleHabit=async (habitId,isCompleted)=>{
    try{
        const token=localStorage.getItem('token')
        const dateString=format(selectedDate,'yyyy-MM-dd')
        if(isCompleted){
            await axios.delete(`http://localhost:3000/api/completions?habitId=${habitId}&date=${dateString}`,{
                headers:{Authorization:`Bearer ${token}`}
            })

        }else{
            await axios.post('http://localhost:3000/api/completions', 
                    { habitId: habitId, date: dateString }, // Body data
                    { headers: { Authorization: `Bearer ${token}` } } // Headers
                );
        }
        fetchDashboard(selectedDate)
    }catch(error){
        console.error("Error toggling habit:",error)
        alert("Failed to update habit.")
    }
}


const fetchDashboard = async (date) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return; 

      const dateString = format(date, 'yyyy-MM-dd');

      const response = await axios.get(`http://localhost:3000/api/dashboard?date=${dateString}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setHabits(response.data);

    } catch (error) {
      console.error("Error fetching dashboard:", error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };



    useEffect(()=>{
        const token=localStorage.getItem('token')

        if (!token){
            navigate('/login')
            return
        }else{
            fetchDashboard(selectedDate);
        }
    },[navigate,selectedDate])

    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }



    return (
        <div className="min-h-screen bg-gray-100 p-8">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    My <span className="text-primary-600">Onward</span> Dashboard
                </h1>
                <button
                    className="bg-white text-gray-600 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 border border-gray-200"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">
                            Habits for {format(selectedDate, 'MMMM do, yyyy')}
                        </h2>

                        <div className="space-y-3">
                            {habits.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="text-gray-500 italic">No habits found for this day.</p>
                                    <p className="text-sm text-gray-400 mt-2">Go to "Habits" page to create some!</p>
                                </div>
                            ) : (
                                habits.map((habit) => (
                                    <div 
                                        key={habit.id} 
                                        onClick={()=>toggleHabit(habit.id,habit.completed)}
                                        className={`p-4 rounded-lg border flex justify-between items-center cursor-pointer transition-all duration-200 hover:shadow-md ${
                                            habit.completed 
                                                ? 'bg-green-50 border-green-200' 
                                                : 'bg-white border-gray-200'
                                        }`}
                                    >
                                        <span className={`font-medium ${
                                            habit.completed ? 'text-green-700' : 'text-gray-700'
                                        }`}>
                                            {habit.title}
                                        </span>

                                        <button className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            habit.completed 
                                                ? 'bg-green-200 text-green-800' 
                                                : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            {habit.completed ? 'Done' : 'Not Done'}
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">Time Travel</h3>
                        
                        <Calendar 
                            onChange={setSelectedDate} 
                            value={selectedDate}       
                            className="w-full border-none rounded-lg text-sm"
                        />
                        
                        <div className="mt-4 text-center">
                            <button 
                                onClick={() => setSelectedDate(new Date())}
                                className="text-sm text-primary-600 font-medium hover:underline"
                            >
                                Jump to Today
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default Dashboard