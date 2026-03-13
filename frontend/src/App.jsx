import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ChildDashboard from "./pages/ChildDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/child-dashboard" element={<ChildDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
