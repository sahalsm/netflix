import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export function IsUserRedirect({ children, user, loggedInPath }) {
    if (user){
        return <Navigate to={loggedInPath} replace />;
    }
    return children;
}

export function ProtectedRoute({ children, user }) {
    let location = useLocation();
    if (!user) {
        return <Navigate to="/signin"  state={{ from: location }}   replace />;
    }
    return children;
}