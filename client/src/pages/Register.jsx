import React,{useState} from "react";
import { useNavigate , Link } from "react-router-dom";
import axios from "axios";


const Register=()=>{
    const [formData,setFormData]=useState({
        username:'',
        password:''
    })
    const navigate=useNavigate();

    const handleChange= (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            await axios.post(`https://onward-api.onrender.com/api/auth/register`,formData)
            alert('Registration Successful! Please login.')
            navigate('/login')
        }
        catch(error){
            console.error(error)
            alert('Registration Failed. Check console')
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Join <span className="text-primary-600">Onward</span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Start building your momentum today!! 
                    </p>
                </div>

                {/* <h1>Form will go here</h1> */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input 
                            id="username" 
                            name="username"
                            type="text"
                            required 
                            value={formData.username}
                            onChange={handleChange}
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
                            name="password"
                            id="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" 
                            placeholder="Create a Strong Password :-)"/>
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border cursor-pointer border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        
                    >
                        Create Account
                    </button>

                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to='/login' className="font-medium text-primary-600 hover:text-primary-500">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register