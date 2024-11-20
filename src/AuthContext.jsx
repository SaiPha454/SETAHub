import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [messageSocket, setMessageSocket] = useState(null);
    const fetchUser = async () => {
        try {
            const response = await axios.get("http://localhost:8000/auth/", {
                withCredentials: true,
            });

            setAuthUser(response.data);
        } catch (error) {
            console.error("Authentication failed:", error);
            setAuthUser(null); // User is not authenticated
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser(); // Fetch user on app load
    }, []); // Empty dependency array ensures this runs only once on mount


    useEffect(()=>{
        if (authUser){
            const newSocket = new WebSocket(`ws://localhost:8000/chatting/${authUser.id}`);
                // Attach WebSocket event listeners
                newSocket.onopen = () => {
                    console.log("WebSocket connection established.");
                };
        
                newSocket.onclose = () => {
                    console.log("WebSocket connection closed.");
                    setMessageSocket(null); // Clean up socket reference
                };
        
                newSocket.onerror = (error) => {
                    console.error("WebSocket error:", error);
                };
            // Set WebSocket instance
            setMessageSocket(newSocket);
        }

        // Cleanup WebSocket when component unmounts
        return () => {
            if (messageSocket) {
                messageSocket.close(); // Close WebSocket connection
            }
        };
    }, [authUser])

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, loading, messageSocket }}>
            {loading ? <div>Loading...</div> : children} {/* Add a loading indicator */}
        </AuthContext.Provider>
    );
};
