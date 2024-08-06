import React, { forwardRef } from "react";
import "./Footer.css";

const Footer = forwardRef((props, ref) => {
  return (
    <footer className="footer" ref={ref}>
      <div className="footer-content">
        <h4>Contact Us</h4>
        <p>Email: contact@hungo.org</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Address: 123 Food Rescue St, Sustainability City, SC 12345</p>
      </div>
    </footer>
  );
});

export default Footer;
