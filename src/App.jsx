import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/login.jsx";
import RegisterPage from "./components/register.jsx";
import DashboardPage from "./components/dashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;

