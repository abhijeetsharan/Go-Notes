import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:4000/api/register", {
        name,
        email,
        password,
      });
      dispatch(loginSuccess(response.data));
      localStorage.setItem("token", response.data.token);
      navigate("/"); // Redirect to login after successful registration
    } catch (err) {
      setError("Failed to register. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleRegister} className="p-6 shadow-md rounded-md bg-white w-96">
        <h2 className="text-xl font-semibold mb-4">Register</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded mt-2">
          Register
        </button>

        <p className="mt-4 text-sm">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
