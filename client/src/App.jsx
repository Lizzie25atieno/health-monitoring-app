import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar.jsx";
import AddHealthForm from "./components/AddHealthForm.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";  
import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  const { user } = useContext(AuthContext);

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      <Routes>
        {/* UPDATED: Show Welcome page at root */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddHealthForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;