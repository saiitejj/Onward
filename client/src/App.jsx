import React from "react";
import { Routes,Route } from "react-router-dom";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
function App(){
  return (
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    //   <div className="text-center">
    //     <h1 className="text-4xl font-bold text-blue-600 mb-4">Onward</h1>
    //     <p className="text-gray-1000 font-bold">Frontend Setup Complete!!!</p>
    //   </div>
    // </div>
    // <Register />
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dash" element={<Dashboard />} />
      <Route path="/hab" element={<Habits />} />
      <Route path="/" element={<Register />} />
    </Routes>

  )
} 

export default App;
