import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: { firstName, lastName },
      email,
      password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate("/home");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="uber-logo.png"
          alt=""
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-2">What's Your Name</h3>
          <div className="flex gap-4 mb-6">
            <input
              className="w-1/2 bg-[#eeeeee] text-lg border rounded px-4 py-2 placeholder:text-base"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="first name"
            />
            <input
              className="w-1/2 bg-[#eeeeee] text-lg border rounded px-4 py-2 placeholder:text-base"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="last name"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's Your Email</h3>
          <input
            className="text-lg border rounded px-4 py-2 bg-[#eeeeee] w-full mb-6 placeholder:text-base"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="text-lg border rounded px-4 py-2 bg-[#eeeeee] w-full mb-6 placeholder:text-base"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 w-full rounded text-lg px-4 py-2">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[11px] leading-tight">
          This site is protected by reCAPTCHA and the
          <span className="underline"> Google Privacy Policy </span>and
          <span className="underline"> Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
