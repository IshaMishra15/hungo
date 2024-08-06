import React from "react";
import NavbarNgo from "../Navbar/NavbarNgo";
const AboutNgoPage = () => {
  return (
    <>
      <NavbarNgo />
      <div className="about-us">
        <div className="about-us-container">
          <div className="about-us-image">
            <img
              src="https://img.freepik.com/free-photo/delivery-person-getting-parcel-out-delivery_23-2149371955.jpg?uid=R156290455&ga=GA1.1.1773258656.1721460394&semt=ais_user"
              alt="About Us"
              style={{ height: "70%", width: "70%" }}
            />
          </div>
          <div className="about-us-content">
            <h3>huNGO:</h3>
            <h2>"Bridging the Gap Between Food Waste and Food Insecurity"</h2>
            <p className="did-you-know">Did you know?</p>
            <p>
              A staggering one-third of all food produced globally goes to waste
              each year, while millions of people struggle with hunger. This
              disconnect is a major issue, not just morally, but also
              environmentally. Food waste contributes to greenhouse gas
              emissions and strains our natural resources.
            </p>
            <p>
              huNGO steps in to bridge this gap. We're a user-friendly web
              platform that connects restaurants with surplus food to NGOs
              serving those in need. This creates a more sustainable food system
              and ensures good food reaches those who need it most.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutNgoPage;
