import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Hello!</div>} />

        <Route path="/signup" element={<Register />} />

        {/* 404 Not Found */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
