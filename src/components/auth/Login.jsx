import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import Logo from "../logo/Logo";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { useState } from "react";

export default function Login() {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    console.log("prevented default");

    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage(""); // Reset error message before each login attempt
      try {
        console.log(
          "Attempting to sign in with email:",
          email,
          "and password:",
          password
        );
        await doSignInWithEmailAndPassword(email, password);

        console.log("redirecting to home");

        // Redirect to /home on successful login
        navigate("/home");
      } catch (error) {
        console.error("Login error:", error); // Log the error to console
        setErrorMessage(error.message); // Capture and display error message
      } finally {
        setIsSigningIn(false); // Reset signing state
      }
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="absolute top-4 left-4">
          <Logo />
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <form className="mt-6 space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forgot-password" // Use Link instead of anchor
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSigningIn}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isSigningIn
                      ? "bg-gray-400"
                      : "bg-indigo-600 hover:bg-indigo-500"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {isSigningIn ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
            {errorMessage && (
              <p className="mt-4 text-red-600 text-center">{errorMessage}</p>
            )}
            <p className="mt-6 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to="/signup" // Use Link instead of anchor
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
