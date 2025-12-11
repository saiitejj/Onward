import React,{useState} from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
const LoginPage=()=>{
    const [formData,setFormData]=useState({
        username:'',
        password:''
    })
    const navigate=useNavigate()

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        try{
            const response=await axios.post('https://onward-api.onrender.com/api/auth/login',formData)
            localStorage.setItem('token',response.data.token)
            alert('Login Successful!')
            navigate('/dashboard')

        }
        catch(error){
            console.error(error)
            alert('Login Failed. Check username/password')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="text-center mb-8">
                    <h2 className=" text-center text-3xl font-extrabold text-login-600">
                        <span className="text-primary-600 items-center justify-center" >Onward</span>
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 ">
                            Username
                        </label>
                        <input 
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 ">
                            Password
                        </label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        Login
                    </button>


                </form>
            </div>
        </div>
    )
}

export default LoginPage