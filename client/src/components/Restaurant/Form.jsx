import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

// Replace this with your image URL
const backgroundImageUrl = "https://example.com/path-to-your-image.jpg";

export default function Form() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("");
  const [type, setType] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [photo, setPhoto] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("servings", servings);
      formData.append("type", type);
      formData.append("restaurantName", restaurantName);
      if (photo) {
        formData.append("photo", photo);
      }

      const response = await axios.post(
        "http://localhost:5000/api/food",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setName("");
      setDescription("");
      setServings("");
      setType("");
      setRestaurantName("");
      setPhoto(null);

      alert("Food item created successfully");
    } catch (error) {
      console.error("Error creating food item:", error);
      alert("Failed to create food item");
    }
  };

  // Inline styles
  const pageStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "600px",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
    opacity: "0.9", // Slightly transparent background for the form
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    border: "1px solid #d1d5db",
    borderRadius: "20px",
    boxSizing: "border-box",
    fontSize: "16px",
  };

  const labelStyle = {
    display: "block",
    fontSize: "15px",
    fontWeight: "500",
    color: "#4b5563",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
    color: "black",
  };

  const buttonStyle = {
    backgroundColor: "#f075aa",
    color: "#ffffff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "35px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const radioGroupStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "16px",
    color: "#4b5563",
  };

  const globalStyle = `
    body {
        font-family: 'Epilogue', 'Noto Sans', sans-serif;
    }
    input, textarea, button, label, h1, h2 {
        font-family: inherit;
    }
    ::-webkit-input-placeholder {
        font-family: inherit;
        font-size: inherit;
        color: #9CA3AF;
    }
    :-ms-input-placeholder {
        font-family: inherit;
        font-size: inherit;
        color: #9CA3AF;
    }
    ::placeholder {
        font-family: inherit;
        font-size: inherit;
        color: #9CA3AF;
    }
  `;

  return (
    <>
      <Navbar />
      <div style={pageStyle}>
        <style>{globalStyle}</style>
        <div style={cardStyle}>
          <div style={headerStyle}>
            <h1 style={{ fontSize: "34px", fontWeight: "bold" }}>ADD ITEMS</h1>
          </div>

          <form onSubmit={handleSubmit} style={formStyle}>
            <div>
              <input
                id="name"
                type="text"
                value={name}
                placeholder="Enter the name of Items"
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...inputStyle, height: "100px", resize: "vertical" }}
                placeholder="Enter description"
              />
            </div>
            <div>
              <input
                id="servings"
                type="number"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                style={inputStyle}
                placeholder="Enter number of servings available"
              />
            </div>
            <div>
              <div style={radioGroupStyle}>
                <h2 style={labelStyle}>Choose type of food item</h2>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="Veg"
                    checked={type === "Veg"}
                    onChange={(e) => setType(e.target.value)}
                    style={{ marginLeft: "8px" }}
                  />
                  Veg
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="Non-Veg"
                    checked={type === "Non-Veg"}
                    onChange={(e) => setType(e.target.value)}
                    style={{ marginLeft: "8px" }}
                  />
                  Non-Veg
                </label>
              </div>
            </div>
            <div>
              <input
                id="restaurantName"
                type="text"
                value={restaurantName}
                placeholder="Enter the restaurant name"
                onChange={(e) => setRestaurantName(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="photo" style={labelStyle}>
                Photo
              </label>
              <input
                id="photo"
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                style={inputStyle}
              />
            </div>
            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  buttonHoverStyle.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  buttonStyle.backgroundColor)
              }
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
