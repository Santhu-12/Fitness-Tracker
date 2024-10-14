import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ProtectedRoute = ({ element }) => {
  const { userLoggedIn, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return userLoggedIn ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
