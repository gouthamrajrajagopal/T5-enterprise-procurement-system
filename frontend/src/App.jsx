import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Supplier from "./pages/Supplier";
import Department from "./pages/Department";
import Category from "./pages/Category";
import ApprovalHierarchy from "./pages/ApprovalHierarchy";
import SupplierCompliance from "./pages/SupplierCompliance";

import PurchaseRequest from "./pages/PurchaseRequest";
import VendorSelection from "./pages/VendorSelection";
import PurchaseOrder from "./pages/PurchaseOrder";
import GoodsReceipt from "./pages/GoodsReceipt";

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

                <Route
                    path="/purchase-request"
                    element={<PurchaseRequest />}
                />

                <Route
                    path="/vendor-selection"
                    element={<VendorSelection />}
                />

                <Route
                    path="/purchase-order"
                    element={<PurchaseOrder />}
                />

                <Route
                    path="/goods-receipt"
                    element={<GoodsReceipt />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;