/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import NavbarNgo from "../Navbar/NavbarNgo";
import { useNavigate } from "react-router-dom";
import "./Order.css";

const Order = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(() => {
    const savedItems = localStorage.getItem("selectedItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchFoodItems();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/food");
      setFoodItems(response.data);
    } catch (error) {
      console.error("Failed to fetch food items:", error);
    }
  };

  const addItem = (item) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (id) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
  };

  const proceedToCheckout = () => {
    navigate("/checkout", { state: { items: selectedItems, restaurantName } });
  };

  const isSelected = (id) => {
    return selectedItems.some((item) => item._id === id);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <NavbarNgo />
      <div className="order-container">
        {foodItems.map((item) => (
          <div
            key={item._id}
            className={`card ${isSelected(item._id) ? "selected" : ""}`}
          >
            <img
              src={`data:image/jpeg;base64,${item.photo}`}
              alt={item.name}
              className="card-image"
            />
            <div className="card-content">
              <p className="restaurant-name">
                Restaurant: {item.restaurantName}
              </p>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>Servings: {item.servings}</p>
              <p>Type: {item.type}</p>
              <button onClick={() => addItem(item)}>Add +</button>
              <button onClick={() => removeItem(item._id)}>Remove -</button>
            </div>
          </div>
        ))}
        {selectedItems.length > 0 && (
          <button className="proceed-button" onClick={proceedToCheckout}>
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;
*/
// Order.jsx
/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import NavbarNgo from "../Navbar/NavbarNgo";
import { useNavigate } from "react-router-dom";
import "./Order.css";

const Order = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(() => {
    const savedItems = localStorage.getItem("selectedItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [restaurantName, setRestaurantName] = useState(""); // Add state for restaurantName
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchFoodItems();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/food");
      setFoodItems(response.data);
    } catch (error) {
      console.error("Failed to fetch food items:", error);
    }
  };

  const addItem = (item) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
    setRestaurantName(item.restaurantName); // Set the restaurantName when an item is added
  };

  const removeItem = (id) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
  };

  const proceedToCheckout = () => {
    navigate("/checkout", { state: { items: selectedItems, restaurantName } });
  };

  const isSelected = (id) => {
    return selectedItems.some((item) => item._id === id);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <NavbarNgo />
      <div className="order-container">
        {foodItems.map((item) => (
          <div
            key={item._id}
            className={`card ${isSelected(item._id) ? "selected" : ""}`}
          >
            <img
              src={`data:image/jpeg;base64,${item.photo}`}
              alt={item.name}
              className="card-image"
            />
            <div className="card-content">
              <p className="restaurant-name">
                Restaurant: {item.restaurantName}
              </p>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>Servings: {item.servings}</p>
              <p>Type: {item.type}</p>
              <button onClick={() => addItem(item)}>Add +</button>
              <button onClick={() => removeItem(item._id)}>Remove -</button>
            </div>
          </div>
        ))}
        {selectedItems.length > 0 && (
          <button className="proceed-button" onClick={proceedToCheckout}>
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;
*/
/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import NavbarNgo from "../Navbar/NavbarNgo";
import { useNavigate } from "react-router-dom";
import "./Order.css";

const Order = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(() => {
    const savedItems = localStorage.getItem("selectedItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [restaurantName, setRestaurantName] = useState(""); // Add state for restaurantName
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchFoodItems();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const fetchFoodItems = async () => {
    try {
      const foodResponse = await axios.get("http://localhost:5000/api/food");
      const allFoodItems = foodResponse.data;

      let availableFoodItems = allFoodItems;
      if (restaurantName) {
        const ordersResponse = await axios.get(
          "http://localhost:5000/api/orders/history",
          {
            params: { restaurantName },
          }
        );
        const orderedItems = ordersResponse.data.flatMap((order) =>
          order.items.map((item) => item._id)
        );

        // Filter out ordered items
        availableFoodItems = allFoodItems.filter(
          (item) => !orderedItems.includes(item._id)
        );
      }

      setFoodItems(availableFoodItems);
    } catch (error) {
      console.error("Failed to fetch food items:", error);
    }
  };

  const addItem = (item) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
    setRestaurantName(item.restaurantName); // Set the restaurantName when an item is added
  };

  const removeItem = (id) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
  };

  const proceedToCheckout = () => {
    navigate("/checkout", { state: { items: selectedItems, restaurantName } });
  };

  const isSelected = (id) => {
    return selectedItems.some((item) => item._id === id);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <NavbarNgo />
      <div className="order-container">
        {foodItems.map((item) => (
          <div
            key={item._id}
            className={`card ${isSelected(item._id) ? "selected" : ""}`}
          >
            <img
              src={`data:image/jpeg;base64,${item.photo}`}
              alt={item.name}
              className="card-image"
            />
            <div className="card-content">
              <p className="restaurant-name">
                Restaurant: {item.restaurantName}
              </p>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>Servings: {item.servings}</p>
              <p>Type: {item.type}</p>
              <button onClick={() => addItem(item)}>Add +</button>
              <button onClick={() => removeItem(item._id)}>Remove -</button>
            </div>
          </div>
        ))}
        {selectedItems.length > 0 && (
          <button className="proceed-button" onClick={proceedToCheckout}>
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import NavbarNgo from "../Navbar/NavbarNgo";
import { useNavigate } from "react-router-dom";
import "./Order.css";

const Order = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(() => {
    const savedItems = localStorage.getItem("selectedItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [restaurantName, setRestaurantName] = useState("");
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchFoodItems();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const fetchFoodItems = async () => {
    try {
      const foodResponse = await axios.get("http://localhost:5000/api/food");
      const allFoodItems = foodResponse.data;

      let availableFoodItems = allFoodItems;
      if (restaurantName) {
        const ordersResponse = await axios.get(
          "http://localhost:5000/api/orders/history",
          {
            params: { restaurantName },
          }
        );
        const orderedItems = ordersResponse.data.flatMap((order) =>
          order.items.map((item) => item._id)
        );

        // Filter out ordered items
        availableFoodItems = allFoodItems.filter(
          (item) => !orderedItems.includes(item._id)
        );
      }

      // Filter out selected items
      availableFoodItems = availableFoodItems.filter(
        (item) => !selectedItems.some((selected) => selected._id === item._id)
      );

      setFoodItems(availableFoodItems);
    } catch (error) {
      console.error("Failed to fetch food items:", error);
    }
  };

  const addItem = (item) => {
    setSelectedItems((prevItems) => {
      const updatedItems = [...prevItems, item];
      localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
    setRestaurantName(item.restaurantName);
    setFoodItems((prevItems) =>
      prevItems.filter((foodItem) => foodItem._id !== item._id)
    );
  };

  const removeItem = (id) => {
    setSelectedItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item._id !== id);
      localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const proceedToCheckout = () => {
    navigate("/checkout", { state: { items: selectedItems, restaurantName } });
    // Clear selected items after proceeding to checkout
    setSelectedItems([]);
    localStorage.removeItem("selectedItems");
  };

  const isSelected = (id) => {
    return selectedItems.some((item) => item._id === id);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <NavbarNgo />
      <div className="order-container">
        {foodItems.map((item) => (
          <div
            key={item._id}
            className={`card ${isSelected(item._id) ? "selected" : ""}`}
          >
            <img
              src={`data:image/jpeg;base64,${item.photo}`}
              alt={item.name}
              className="card-image"
            />
            <div className="card-content">
              <p className="restaurant-name">
                Restaurant: {item.restaurantName}
              </p>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>Servings: {item.servings}</p>
              <p>Type: {item.type}</p>
              <button onClick={() => addItem(item)}>Add +</button>
              <button onClick={() => removeItem(item._id)}>Remove -</button>
            </div>
          </div>
        ))}
        {selectedItems.length > 0 && (
          <button className="proceed-button" onClick={proceedToCheckout}>
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;
