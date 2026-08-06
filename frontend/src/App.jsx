import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import RaiseRequisition from "./pages/Employee/RaiseRequisition";
import MyRequisitions from "./pages/Employee/MyRequisitions";
import RequisitionDetails from "./pages/Employee/RequisitionDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import ManagerDashboard from "./pages/Manager/ManagerDashboard";
import PendingRequests from "./pages/Manager/PendingRequests";
import RequestDetails from "./pages/Manager/RequestDetails";
import ApprovalHistory from "./pages/Manager/ApprovalHistory";
import ProcurementDashboard from "./pages/Procurement/ProcurementDashboard";
import PendingVendorSelection from "./pages/Procurement/PendingVendorSelection";
import ProcurementRequestDetails from "./pages/Procurement/ProcurementRequestDetails";
import ProcurementHistory from "./pages/Procurement/ProcurementHistory";
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
    <Route
    path="/manager/dashboard"
    element={
        <ProtectedRoute
            allowedRoles={["MANAGER"]}
        >
            <ManagerDashboard />
        </ProtectedRoute>
    }
/>

<Route
    path="/manager/pending"
    element={
        <ProtectedRoute
            allowedRoles={["MANAGER"]}
        >
            <PendingRequests />
        </ProtectedRoute>
    }
/>
<Route
    path="/manager/request/:id"
    element={
        <ProtectedRoute
            allowedRoles={["MANAGER"]}
        >
            <RequestDetails />
        </ProtectedRoute>
    }
/>
<Route
    path="/manager/history"
    element={
        <ProtectedRoute allowedRoles={["MANAGER"]}>
            <ApprovalHistory />
        </ProtectedRoute>
    }
/>
<Route
    path="/procurement/dashboard"
    element={
        <ProtectedRoute
            allowedRoles={[
                "PROCUREMENT_OFFICER",
                "ADMIN",
            ]}
        >
            <ProcurementDashboard />
        </ProtectedRoute>
    }
/>

<Route
    path="/procurement/pending"
    element={
        <ProtectedRoute
            allowedRoles={[
                "PROCUREMENT_OFFICER",
                "ADMIN",
            ]}
        >
            <PendingVendorSelection />
        </ProtectedRoute>
    }
/>

<Route
    path="/procurement/request/:id"
    element={
        <ProtectedRoute
            allowedRoles={[
                "PROCUREMENT_OFFICER",
                "ADMIN",
            ]}
        >
            <ProcurementRequestDetails />
        </ProtectedRoute>
    }
/>

<Route
    path="/procurement/history"
    element={
        <ProtectedRoute
            allowedRoles={[
                
                "ADMIN",
                "PROCUREMENT_OFFICER",
    "PROCUREMENT_HEAD",
    "PROCUREMENT",
            ]}
        >
            <ProcurementHistory />
        </ProtectedRoute>
    }
/>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes></BrowserRouter>;
}
