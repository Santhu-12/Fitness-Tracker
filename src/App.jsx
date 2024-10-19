import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import { AuthProvider } from "./contexts/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import WaterIntakeTracker from "./components/features/WaterIntakeTracker";
import BMICalculate from "./components/features/BMICalculate";
import EditProfile from "./components/features/EditProfile";
import Goals from "./components/features/Goals";
import Weather from "./components/features/Weather";
import Feedback from "./components/features/Feedback";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          {/* Protect the Dashboard route and define nested routes */}
          <Route
            path="/home"
            element={<ProtectedRoute element={<Dashboard />} />}
          >
            <Route path="water-intake" element={<WaterIntakeTracker />} />
            <Route path="bmi-calculator" element={<BMICalculate />} />
            <Route path="profile" element={<EditProfile />} />
            <Route path="goals" element={<Goals />} />
            <Route path="weather" element={<Weather />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
