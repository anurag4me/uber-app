import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCaptain } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setCaptain } = useCaptain();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      { email, password }
    );
    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mt-[-16px] ml-[-6px]"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-2">Enter Your Email</h3>
          <input
            className="text-lg border rounded px-4 py-2 bg-[#eeeeee] w-full mb-7 placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="text-lg border rounded px-4 py-2 bg-[#eeeeee] w-full mb-7 placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 w-full rounded text-lg px-4 py-2">
            Login
          </button>
        </form>
        <p className="text-center">
          Want to join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] text-white font-semibold mb-3 w-full rounded text-lg px-4 py-2 flex justify-center items-center"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
