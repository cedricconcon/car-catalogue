import { useState } from "react";
import { supabase } from "../supabaseClient";

function AdminLogin({ onLogin }){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        error ? setError(error.message) : onLogin();
    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold font-[playfair] mb-6">Admin Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border-gray-300 rounded-lg px-4 py-2"
                        required
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border-gray-300 rounded-lg px-4 py-2"
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" className="w-full bg-[#C9A96E] text-black py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition">Login</button>
                </form>
            </div>
        </div>
    )
};
    

export default AdminLogin;

