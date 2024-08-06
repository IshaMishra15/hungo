import React from "react";
import { useAuth } from "../hooks/useAuth";
import NavbarNgo from "../Navbar/NavbarNgo";
import { useRef } from "react";
import AboutNgoPage from "../About/AboutNgo";
import Footer from "../Footer/Footer";
const HomePageNgo = () => {
  const isAuthenticated = useAuth();
  const footerRef = useRef();
  if (!isAuthenticated) {
    return null; // or a loading spinner, etc.
  }

  return (
    <div>
      <NavbarNgo />
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "80vh",
            marginTop: "70px",
            marginBottom: "80px",
          }}
        >
          <img
            src="https://img.freepik.com/premium-photo/photo-pink-frosted-cupcake-pastel-background_1060272-15576.jpg"
            alt="Cupcake"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "10%",
              transform: "translateY(-50%)",
              color: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "left", // Align text to the left
              fontSize: "24px",
              fontFamily: 'Epilogue, "Noto Sans", sans-serif',
              // Optional: Add background color for better text readability
              width: "40%", // Optional: Adjust width to fit content
            }}
          >
            Let's work together to make sure that all of us have sustainable
            access to nutritious, affordable food every day where they need it
            and when they need it.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: "95%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "black",
            padding: "20px", // Increased padding for better spacing
            //   borderRadius: '8px',
            backgroundColor: "white",
            textAlign: "center",
            fontSize: "24px",
            fontFamily: 'Epilogue, "Noto Sans", sans-serif',
            width: "60%",
            display: "flex",
            justifyContent: "space-between",
            gap: "20px", // Added gap between items
            flexWrap: "wrap", // Allow items to wrap if there isn’t enough space
            boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.1)",
            borderTop: "4px solid #dc3a44",
          }}
        >
          <div
            style={{
              flex: "1",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div>
              <img
                src="https://img.icons8.com/?size=48&id=P315u02MbQ5F&format=gif"
                alt=""
                style={{ height: "40px" }}
              />
              <h2 style={{ margin: "0", fontSize: "18px" }}>FIND FOOD</h2>
              <p style={{ margin: "0", fontSize: "14px" }}>
                We provide meaningful partnerships that breakdown barriers to
                food access.{" "}
              </p>
            </div>
          </div>
          <div
            style={{
              flex: "1",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div>
              <img
                src="https://img.icons8.com/?size=48&id=xTkoPEFGI0P7&format=gif"
                alt=""
                style={{ height: "40px" }}
              />
              <h2 style={{ margin: "0", fontSize: "18px" }}>TAKE ACTION</h2>
              <p style={{ margin: "0", fontSize: "14px" }}>
                Together we can show decision-makers at every level to improve
                food access for all.
              </p>
            </div>
          </div>
          <div
            style={{
              flex: "1",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div>
              <img
                src="https://img.icons8.com/?size=48&id=8jdMCwiRzYTv&format=gif"
                alt=""
                style={{ height: "40px" }}
              />
              <h2 style={{ margin: "0", fontSize: "18px" }}>SUPPORT US</h2>
              <p style={{ margin: "0", fontSize: "14px" }}>
                Join us as we make sure every collaborator has the healthy,
                culturally appropriate food needed to thrive.
              </p>
            </div>
          </div>
        </div>
      </div>
      <AboutNgoPage />
      <Footer ref={footerRef} />
      {/* <Footer /> */}
    </div>
  );
};

export default HomePageNgo;
