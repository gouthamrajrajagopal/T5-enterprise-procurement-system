import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { normalizeRole } from '../utils'
export default function ProtectedRoute({ children, roles }) { const { isAuthenticated, user } = useAuth(); const location = useLocation(); const role = normalizeRole(user?.role); if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />; if (roles && !roles.includes(role)) return <Navigate to="/" replace />; return children }
