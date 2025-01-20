import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCaptain } from "../context/CaptainContext"
import axios from "axios";

const CaptainSignup = () => {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  
  const { setCaptain } = useCaptain();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: { firstName, lastName },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    }
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate("/captain-home");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleType("");
    setColor("");
    setPlate("");
    setCapacity("");
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
          <h3 className="text-lg font-medium mb-2">What's our Captain's Name</h3>
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

          <h3 className="text-lg font-medium mb-2">What's our Captain's Email</h3>
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
            <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
            <div className="flex gap-4 mb-6">
            <select
              className="w-1/2 bg-[#eeeeee] text-lg border rounded px-4 py-2 placeholder:text-base"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            >
              <option value="" disabled>
              type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
            <input
              className="w-1/2 bg-[#eeeeee] text-lg border rounded px-4 py-2 placeholder:text-base"
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="vehicle color"
            />
            </div>
            <div className="flex gap-4 mb-6">
            <input
              className="w-1/2 bg-[#eeeeee] text-lg border rounded px-4 py-2 placeholder:text-base"
              type="text"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              placeholder="license plate"
            />
            <input
              className="w-1/2 bg-[#eeeeee] text-lg border rounded px-4 py-2 placeholder:text-base"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="capacity"
            />
            </div>
          <button className="bg-[#111] text-white font-semibold mb-3 w-full rounded text-lg px-4 py-2">
            Create Captain Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div className="mt-8 pb-3">
        <p className="text-[11px] leading-tight">
          This site is protected by reCAPTCHA and the
          <span className="underline"> Google Privacy Policy </span>and
          <span className="underline"> Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
