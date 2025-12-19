import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import IntroAnimation from "../components/IntroAnimation"; // Import the animation component

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    
    // New State: Should we show the animation?
    const [showAnimation, setShowAnimation] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Use your LIVE Render URL here
            const response = await axios.post('https://onward-api.onrender.com/api/auth/login', formData);
            
            localStorage.setItem('token', response.data.token);
            
            // INSTEAD of alerting and navigating immediately...
            // We show the animation!
            setShowAnimation(true);

        } catch (error) {
            console.error(error);
            alert('Login Failed. Check username/password.');
        }
    }

    // New Function: Run this when animation finishes
    const handleAnimationComplete = () => {
        navigate('/dashboard');
    }

    // If showAnimation is true, render the Animation INSTEAD of the form
    if (showAnimation) {
        return <IntroAnimation onComplete={handleAnimationComplete} />;
    }

    // Otherwise, render the normal Login Form
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                
                <div className="text-center mb-8">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        <span className="text-primary-600">Onward</span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">Welcome back!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input 
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center cursor-pointer py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                            Register
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default LoginPage;