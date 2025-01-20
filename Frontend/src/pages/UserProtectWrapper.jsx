import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { setUser } = useUser();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token, navigate, setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
