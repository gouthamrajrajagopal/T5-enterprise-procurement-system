import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DirectorDashboard from "./pages/Director/DirectorDashboard";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import RaiseRequisition from "./pages/Employee/RaiseRequisition";
import MyRequisitions from "./pages/Employee/MyRequisitions";
import RequisitionDetails from "./pages/Employee/RequisitionDetails";

import VendorDashboard from "./pages/Vendor/VendorDashboard"; // Change to ./pages/vendor/VendorDashboard if needed

import ProtectedRoute from "./components/ProtectedRoute";

const EmployeeOnly = ({ children }) => (
    <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
      {children}
    </ProtectedRoute>
);

const VendorOnly = ({ children }) => (
    <ProtectedRoute allowedRoles={["VENDOR"]}>
      {children}
    </ProtectedRoute>
);

export default function App() {
  return (
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* Employee Routes */}

          <Route
              path="/employee/dashboard"
              element={
                <EmployeeOnly>
                  <EmployeeDashboard />
                </EmployeeOnly>
              }
          />

          <Route
              path="/employee/raise-request"
              element={
                <EmployeeOnly>
                  <RaiseRequisition />
                </EmployeeOnly>
              }
          />

          <Route
              path="/employee/my-requests"
              element={
                <EmployeeOnly>
                  <MyRequisitions />
                </EmployeeOnly>
              }
          />

          <Route
              path="/employee/request/:id"
              element={
                <EmployeeOnly>
                  <RequisitionDetails />
                </EmployeeOnly>
              }
          />

          {/* Vendor Route */}

          <Route
              path="/Vendor/dashboard"
              element={
                <VendorOnly>
                  <VendorDashboard />
                </VendorOnly>
              }
          />

          <Route
              path="*"
              element={<Navigate to="/login" replace />}
          />


          <Route
              path="/director/dashboard"
              element={<DirectorDashboard />}
          />

      </Routes>
      </BrowserRouter>
  );
}