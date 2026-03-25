import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DemoLogin from "./pages/DemoLogin";
import ChildDashboard from "./pages/ChildDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/demo" element={<DemoLogin />} />
        <Route
          path="/child-dashboard"
          element={
            <ProtectedRoute role="child">
              <ChildDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent-dashboard"
          element={
            <ProtectedRoute role="parent">
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
