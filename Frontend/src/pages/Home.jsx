import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { useSocket } from "../context/SocketContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const navigate = useNavigate();
  // State hooks
  const [destination, setDestination] = useState("");
  const [pickup, setPickup] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  // Refs for panels
  const panelOpenRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const mapRef = useRef(null);
  const panelContainerRef = useRef(null);

  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const { user } = useUser();
  const { socket } = useSocket();

  useEffect(() => {
    socket.emit("join", { userId: user._id, userType: "user"});
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    console.log(ride)
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride }});
  });

  const debouncedFetch = useCallback(
    debounce(async (input) => {
      if (!input || input.length < 3) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found");
        }
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (type === "pickup") {
      setPickup(value);
    } else {
      setDestination(value);
    }
    setActiveInput(type);
    debouncedFetch(value);
  };

  const handleSuggestionSelect = (suggestion) => {
    if (activeInput === "pickup") {
      setPickup(suggestion.structured_formatting.main_text);
      if(!document.getElementById("destination").value) {
        document.getElementById("destination").select()
        setActiveInput("destination")
      }
    } else {
      setDestination(suggestion.structured_formatting.main_text);
      if(!document.getElementById("pickup").value) {
        document.getElementById("pickup").select()
        setActiveInput("pickup")
      }
    }
    // setPanelOpen(false);
    // setVehiclePanel(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setDestination("");
    setPickup("");
  };

  // GSAP animations for panel transitions
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelOpenRef.current, {
        height: "63%",
        padding: 24,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
      gsap.to(panelContainerRef.current, {
        height: "100%",
      });
      gsap.to(mapRef.current, {
        height: "0%",
      });
    } else {
      gsap.to(panelOpenRef.current, {
        height: "0%",
        padding: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
      gsap.to(panelContainerRef.current, {
        height: "33.33%",
      });
      gsap.to(mapRef.current, {
        height: "66.66%",
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setFare(response.data);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      { pickup, destination, vehicleType },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  }
  return (
    <div className="h-screen relative overflow-hidden">
      {/* Logo */}
      <img
        className="w-16 absolute top-7 left-7"
        src="uber-logo.png"
        alt="Uber Logo"
      />

      {/* Main Background Image */}
      <div ref={mapRef} className="h-2/3 w-screen" onClick={() => setVehiclePanel(false)}>
        <LiveTracking />
      </div>

      {/* Panels and Form */}
      <div ref={panelContainerRef} className="h-1/3 absolute bottom-6 w-full flex flex-col justify-end">
        {/* Panel Header and Form */}
        <div className="bg-white p-6 relative">
          <h5
            className="absolute top-6 right-6 text-2xl opacity-0"
            onClick={() => setPanelOpen(false)}
            ref={panelCloseRef}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={handleSubmit}>
            <div className="line absolute h-16 w-1 left-10 bg-gray-700 top-[36%] rounded-full"></div>
            <input
              className="bg-[#eeeeee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              id="pickup"
              value={pickup}
              onChange={(e) => handleInputChange(e, "pickup")}
              onClick={() => {
                setPanelOpen(true);
                setActiveInput("pickup");
              }}
              placeholder="Add a pick-up location"
            />
            <input
              className="bg-[#eeeeee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => handleInputChange(e, "destination")}
              onClick={() => {
                setPanelOpen(true);
                setActiveInput("destination");
              }}
              placeholder="Enter your destination"
            />
          </form>
          <button
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
            onClick={findTrip}
          >
            Find Trip
          </button>
        </div>

        {/* Location Search Panel */}
        <div ref={panelOpenRef} className="bg-white h-0">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            suggestions={suggestions}
            loading={loading}
            onSuggestionSelect={handleSuggestionSelect}
          />
        </div>
      </div>

      {/* Vehicle Panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-8 pt-12 translate-y-full"
      >
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          fare={fare}
          selectVehicle={setVehicleType}
        />
      </div>

      {/* Confirm Ride Panel */}
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>

      {/* Vehicle Found Panel */}
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full"
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>

      {/* Waiting For Driver Panel */}
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full"
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default Home;
