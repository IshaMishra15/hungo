// // Checkout.jsx
// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import "./Checkout.css";
// import NavbarNgo from "../Navbar/NavbarNgo";

// // Checkout.jsx
// const Checkout = () => {
//   const location = useLocation();
//   const { items, restaurantName } = location.state;
//   const [ngoName, setNgoName] = useState("");
//   const [address, setAddress] = useState("");
//   const [pickupTime, setPickupTime] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const orderDetails = {
//       items,
//       ngoName,
//       address,
//       pickupTime,
//       restaurantName, // Include restaurantName
//     };
//     try {
//       await axios.post("http://localhost:5000/api/orders", orderDetails);
//       alert("Order placed successfully");
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("Failed to place order");
//     }
//   };

//   return (
//     <>
//       <NavbarNgo />
//       <div className="checkout-container">
//         <h1>Order Details</h1>
//         <div className="order-summary">
//           <h2>Order Summary</h2>
//           {items.map((item, index) => (
//             <div key={`${item._id}-${index}`} className="summary-item">
//               <p className="item-name">{item.name}</p>
//               <p className="item-servings">Servings: {item.servings}</p>
//               <p className="item-servings">Restaurant: {item.restaurantName}</p>
//             </div>
//           ))}
//         </div>
//         <form onSubmit={handleSubmit} className="checkout-form">
//           <label className="form-label">
//             NGO Name:
//             <input
//               type="text"
//               value={ngoName}
//               onChange={(e) => setNgoName(e.target.value)}
//               required
//               className="form-input"
//             />
//           </label>
//           <label className="form-label">
//             Address:
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//               className="form-input"
//             />
//           </label>
//           <label className="form-label">
//             Pickup Time:
//             <input
//               type="time"
//               value={pickupTime}
//               onChange={(e) => setPickupTime(e.target.value)}
//               required
//               className="form-input"
//             />
//           </label>
//           <button type="submit" className="submit-button">
//             Submit Order
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Checkout;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";
import NavbarNgo from "../Navbar/NavbarNgo";

const Checkout = () => {
  const location = useLocation();
  const { items, restaurantName } = location.state;
  const [ngoName, setNgoName] = useState("");
  const [address, setAddress] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderDetails = {
      items,
      ngoName,
      address,
      pickupTime,
      restaurantName,
    };
    try {
      await axios.post("http://localhost:5000/api/orders", orderDetails);
      alert("Order placed successfully");
      // Clear selected items after placing the order
      localStorage.removeItem("selectedItems");
      navigate("/order");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
    }
  };

  return (
    <>
      <NavbarNgo />
      <div className="checkout-container">
        <h1>Order Details</h1>
        <div className="order-summary">
          <h2>Order Summary</h2>
          {items.map((item, index) => (
            <div key={`${item._id}-${index}`} className="summary-item">
              <p className="item-name">{item.name}</p>
              <p className="item-servings">Servings: {item.servings}</p>
              <p className="item-servings">Restaurant: {item.restaurantName}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="checkout-form">
          <label className="form-label">
            NGO Name:
            <input
              type="text"
              value={ngoName}
              onChange={(e) => setNgoName(e.target.value)}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Pickup Time:
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              required
              className="form-input"
            />
          </label>
          <button type="submit" className="submit-button">
            Submit Order
          </button>
        </form>
      </div>
    </>
  );
};

export default Checkout;
