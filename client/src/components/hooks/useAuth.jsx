import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/auth/currentUser",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setIsAuthenticated(true);
          setUser(response.data);
        } catch (error) {
          console.error("Authentication failed:", error);
          setIsAuthenticated(false);
          setUser(null);
          navigate("/login");
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  return { isAuthenticated, user };
};
