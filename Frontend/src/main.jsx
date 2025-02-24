import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import 'remixicon/fonts/remixicon.css';
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserContext";
import CaptainProvider from "./context/CaptainContext";
import { SocketProvider } from "./context/SocketContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaptainProvider>
      <UserProvider>
        <SocketProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SocketProvider>
      </UserProvider>
    </CaptainProvider>
  </StrictMode>
);
