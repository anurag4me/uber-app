import React, { useState, createContext, useContext } from "react";

const CaptainContext = createContext();

export const useCaptain = () => {
  const context = useContext(CaptainContext);
  if (!context) {
    throw new Error("useCaptain must be used within a CaptainProvider");
  }
  return context;
}

const CaptainProvider = ({ children }) => {
  const [captain, setCaptain] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
    status: "inactive",
    vehicle: {
      color: "",
      plate: "",
      capacity: 0,
      vehicleType: "",
      location: {
        lat: 0,
        lng: 0,
      },
    },
  });

  return (
    <CaptainContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainContext.Provider>
  );
};

export default CaptainProvider;
