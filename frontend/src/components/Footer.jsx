import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

// Mock components for rendering
const JobSeekerHelp = () => <div>Job Seeker Help Content</div>;
const EmployerSupport = () => <div>Employer Support Content</div>;
const ContactUs = () => <div>Contact Us Content</div>;

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("");

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "4px",
    textAlign: "center",
    width: "100%",  // Adjust width if needed
  };

  return (
    <footer style={{ backgroundColor: "#f8f9fa", padding: "20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", borderTop: "1px solid #e7e7e7" }}>
      <div style={{ flex: "1 1 30%", margin: "0px", minWidth: "250px" }}>
        <img src="/Logo.png" alt="Logo" style={{ width: "100px", height: "80px", borderRadius: "50%", objectFit: "cover", border: "5px solid #000" }} />
      </div>

      <div style={{ flex: "1 1 30%", margin: "0px", minWidth: "250px" }}>
        <h1 style={{ fontSize: "25px", marginBottom: "0px", fontWeight: "bold" }}>Support</h1>
        <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
          <li style={{ marginBottom: "5px" }}>
            <button
              style={buttonStyle}
              onClick={() => setComponentName("JobSeekerHelp")}
            >
              Job Seeker Help
            </button>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <button
              style={buttonStyle}
              onClick={() => setComponentName("EmployerSupport")}
            >
              Employer Support
            </button>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <button
              style={buttonStyle}
              onClick={() => setComponentName("ContactUs")}
            >
              Contact Us
            </button>
          </li>
        </ul>

        <div>
          {componentName === "JobSeekerHelp" && <div>Job Seeker Help Content</div>}
          {componentName === "EmployerSupport" && <div>Employer Support Content</div>}
          {componentName === "ContactUs" && <div>Contact Us Content</div>}
        </div>
      </div>

      <div style={{ flex: "1 1 30%", margin: "0px", minWidth: "250px" }}>
        <h4 style={{ fontSize: "25px", marginBottom: "0px", fontWeight: "bold" }}>Quick Links</h4>
        <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
          <li style={{ marginBottom: "5px" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#007bff", fontSize: "14px" }}>Home</Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <Link to="/jobs" style={{ textDecoration: "none", color: "#007bff", fontSize: "14px" }}>Jobs</Link>
          </li>
          {isAuthenticated && (
            <li style={{ marginBottom: "5px" }}>
              <Link to="/dashboard" style={{ textDecoration: "none", color: "#007bff", fontSize: "14px" }}>Dashboard</Link>
            </li>
          )}
        </ul>
      </div>

      <div style={{ flex: "1 1 30%", margin: "0px", minWidth: "250px" }}>
        <h4 style={{ fontSize: "25px", marginBottom: "0px", fontWeight: "bold" }}>Follow Us</h4>
        <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
          <li style={{ marginBottom: "5px" }}>
            <Link to="https://twitter.com/yourprofile" target="_blank" aria-label="Follow us on Twitter" style={{ textDecoration: "none", color: "#007bff", fontSize: "14px" }}>
              <FaTwitter style={{ fontSize: "18px", marginRight: "5px" }} />
              <span>Twitter</span>
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <Link to="https://instagram.com/yourprofile" target="_blank" aria-label="Follow us on Instagram" style={{ textDecoration: "none", color: "#007bff", fontSize: "14px" }}>
              <FaInstagram style={{ fontSize: "18px", marginRight: "5px" }} />
              <span>Instagram</span>
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <Link to="https://youtube.com/yourchannel" target="_blank" aria-label="Follow us on YouTube" style={{ textDecoration: "none", color: "#007bff", fontSize: "14px" }}>
              <FaYoutube style={{ fontSize: "18px", marginRight: "5px" }} />
              <span>YouTube</span>
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <Link to="https://linkedin.com/company/yourcompany" target="_blank" aria-label="Follow us on LinkedIn" style={{ textDecoration: "none", color: "#007bff", fontSize: "14px" }}>
              <FaLinkedinIn style={{ fontSize: "18px", marginRight: "5px" }} />
              <span>LinkedIn</span>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
