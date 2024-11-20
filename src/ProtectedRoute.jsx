import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { authUser } = useContext(AuthContext);
    const location = useLocation();
    console.log("user as : ",authUser)
    if (!authUser) {
        return <Navigate to="/signin" />;
    }

    return children;
};

export default ProtectedRoute;
