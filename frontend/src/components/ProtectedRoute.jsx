import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles = [] }) {
    const location = useLocation();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role")
        ?.trim()
        .toUpperCase();

    const normalizedRoles = allowedRoles.map(
        (allowedRole) => allowedRole.trim().toUpperCase()
    );

    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    if (
        normalizedRoles.length > 0 &&
        !normalizedRoles.includes(role)
    ) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;