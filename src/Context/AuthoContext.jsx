import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = async (name, email, password) => {
        try {
            const response = await fetch("https://glamgrabbackend-dxah8u9g.b4a.run/login/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
    
            const data = await response.json();
            console.log("API Response:", data); // Debugging step
    
            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }
    
            return data;
        } catch (error) {
            console.error("Registration Error:", error);
            throw error;
        }
    };
    

    const verifyOTP = async (email, otp) => {
        return await axios.post("https://glamgrabbackend-dxah8u9g.b4a.run/login/api/verify-otp", { email, otp });
    };

    const login = async (email, password) => {
        const response = await axios.post("https://glamgrabbackend-dxah8u9g.b4a.run/login/api/login", { email, password });
        setUser(response.data.user);
    };

    return (
        <AuthContext.Provider value={{ user, register, verifyOTP, login }}>
            {children}
            </AuthContext.Provider>
    )
};