import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ChildDashboard from "./pages/ChildDashboard";
import ParentDashboard from "./pages/ParentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/child-dashboard" element={<ChildDashboard />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
