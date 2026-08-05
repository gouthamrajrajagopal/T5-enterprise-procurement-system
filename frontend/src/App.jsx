import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import RaiseRequisition from "./pages/Employee/RaiseRequisition";
import MyRequisitions from "./pages/Employee/MyRequisitions";
import RequisitionDetails from "./pages/Employee/RequisitionDetails";
import ProtectedRoute from "./components/ProtectedRoute";

const EmployeeOnly = ({ children }) => <ProtectedRoute allowedRoles={["EMPLOYEE"]}>{children}</ProtectedRoute>;

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/employee/dashboard" element={<EmployeeOnly><EmployeeDashboard /></EmployeeOnly>} />
    <Route path="/employee/raise-request" element={<EmployeeOnly><RaiseRequisition /></EmployeeOnly>} />
    <Route path="/employee/my-requests" element={<EmployeeOnly><MyRequisitions /></EmployeeOnly>} />
    <Route path="/employee/request/:id" element={<EmployeeOnly><RequisitionDetails /></EmployeeOnly>} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes></BrowserRouter>;
}
