import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import './History.css'
const HistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [restaurantName, setRestaurantName] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchUserDataAndOrders = async () => {
      try {
        // Fetch the current user's restaurant name
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect if no token is found
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/auth/currentUser",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const user = response.data;
        console.log(response);
        if (user && user.restaurantName) {
          setRestaurantName(user.restaurantName);
        } else {
          console.error("User or restaurantName is not available");
          navigate("/contact"); // Redirect if user data is not available
          return;
        }

        // Fetch orders using the restaurantName
        const ordersResponse = await axios.get(
          "http://localhost:5000/api/orders/history",
          {
            params: { restaurantName: user.restaurantName },
          }
        );
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error("Failed to fetch user data or orders:", error);
        navigate("/about"); // Redirect on error
      }
    };

    fetchUserDataAndOrders();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="history-container">
        <h1>Order History</h1>
        {orders.length > 0 ? (
          <div className="order-list">
            {orders.map((order) => (
              <div key={order._id} className="order-item">
                <h2>Order from NGO: {order.ngoName}</h2>
                <ul style={{listStyle:"none",textAlign:"center"}}>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - Servings: {item.servings}
                    </li>
                  ))}
                </ul>
                <p>Address: {order.address}</p>
                <p>Pickup Time: {order.pickupTime}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders found for this restaurant.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
