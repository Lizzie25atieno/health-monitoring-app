import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";

const RegisterPage = () => {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const [passwordStrength, setPasswordStrength] = useState("");
 const navigate = useNavigate();
 const { login } = useContext(AuthContext);

 const checkPasswordStrength = (pass) => {
   if (pass.length === 0) {
     setPasswordStrength("");
     return;
   }
   if (pass.length < 6) {
     setPasswordStrength("Weak");
     return;
   }
   // Check for mixed characters
   const hasLetters = /[a-zA-Z]/.test(pass);
   const hasNumbers = /[0-9]/.test(pass);
   const hasSpecial = /[^a-zA-Z0-9]/.test(pass);

   if (hasLetters && hasNumbers && hasSpecial) {
     setPasswordStrength("Strong");
   } else if ((hasLetters && hasNumbers) || (hasLetters && hasSpecial) || (hasNumbers && hasSpecial)) {
     setPasswordStrength("Medium");
   } else {
     setPasswordStrength("Weak");
   }
 };

 const handlePasswordChange = (e) => {
   const newPassword = e.target.value;
   setPassword(newPassword);
   checkPasswordStrength(newPassword);
 };

 const getStrengthColorClass = () => {
   switch (passwordStrength) {
     case "Weak": return "bg-red-500";
     case "Medium": return "bg-orange-500";
     case "Strong": return "bg-green-500";
     default: return "bg-gray-500";
   }
 };

 const getStrengthWidth = () => {
   switch (passwordStrength) {
     case "Weak": return "33%";
     case "Medium": return "66%";
     case "Strong": return "100%";
     default: return "0%";
   }
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setError("");

   try {
     const { data } = await API.post("/auth/register", { name, email, password });
     login(data);
     navigate("/dashboard");
   } catch (err) {
     setError(err.response?.data?.message || "Registration failed");
   }
 };

 return (
   <div className="flex justify-center items-center min-h-screen bg-gray-50">
     <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
       <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Register</h1>
       {error && <p className="text-red-500 mb-4">{error}</p>}
       <form onSubmit={handleSubmit} className="space-y-4">
         <input
           type="text"
           placeholder="Name"
           value={name}
           onChange={(e) => setName(e.target.value)}
           required
           className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
         />
         <input
           type="email"
           placeholder="Email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           required
           className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
         />
         <div>
           <input
             type="password"
             placeholder="Password"
             value={password}
             onChange={handlePasswordChange}
             required
             className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
           />
           {passwordStrength && (
             <div className="mt-2">
               <div className="flex items-center">
                 <div className="w-24 bg-gray-200 rounded-full h-2">
                   <div
                     className={`h-2 rounded-full ${getStrengthColorClass()}`}
                     style={{ width: getStrengthWidth() }}
                   ></div>
                 </div>
                 <span className="ml-2 text-sm text-gray-600">{passwordStrength}</span>
               </div>
             </div>
           )}
         </div>
         <button
           type="submit"
           className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
         >
           Register
         </button>
       </form>
     </div>
   </div>
 );
};

export default RegisterPage;