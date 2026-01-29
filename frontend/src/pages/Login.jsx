import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Login to manage your AI-powered tasks
        </p>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
