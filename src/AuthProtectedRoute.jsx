import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const AuthProtectedRoute = ({ children }) => {
    const { authUser } = useContext(AuthContext);
    
    if (authUser) {
        return <Navigate to="/me" />;
    }

    return children;
};

export default AuthProtectedRoute;
