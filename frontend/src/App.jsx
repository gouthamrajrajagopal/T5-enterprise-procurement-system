import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Supplier from "./pages/Supplier";
import Department from "./pages/Department";
import Category from "./pages/Category";
import ApprovalHierarchy from "./pages/ApprovalHierarchy";
import SupplierCompliance from "./pages/SupplierCompliance";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/suppliers" element={<Supplier />} />

                <Route path="/departments" element={<Department />} />

                <Route path="/categories" element={<Category />} />

                <Route
                    path="/approval-hierarchy"
                    element={<ApprovalHierarchy />}
                />

                <Route
                    path="/supplier-compliance"
                    element={<SupplierCompliance />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;