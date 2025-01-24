import React, { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    // Basic connection login
    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

  }, []);


  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
