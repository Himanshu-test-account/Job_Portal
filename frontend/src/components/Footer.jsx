import React from "react";
import { Link } from "react-router-dom"; // Ensure that Link is imported from react-router-dom
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
// import './footer.css'; // Import the CSS file for the footer styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="logo">
        <img
          src="/Logo.png"
          alt="Logo"
          style={{
            width: "100px",
            height: "80px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "5px solid #000",
          }}
        />
      </div>

      <div className="support">
        <h1>Support</h1>
        <ul>
          <li>
            <Link to="/support/jobseeker-help">Job Seeker Help</Link>
          </li>
          <li>
            <Link to="/support/employer-support">Employer Support</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>

      <div className="quick-links">
        <h4>Quick Links</h4>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>

      <div className="follow-us">
        <h4>Follow Us</h4>
        <ul className="social-icons">
          <li>
            <Link
              to="https://twitter.com/yourprofile"
              target="_blank"
              aria-label="Follow us on Twitter"
            >
              <FaTwitter />
            </Link>
          </li>
          <li>
            <Link
              to="https://instagram.com/yourprofile"
              target="_blank"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram />
            </Link>
          </li>
          <li>
            <Link
              to="https://youtube.com/yourchannel"
              target="_blank"
              aria-label="Follow us on YouTube"
            >
              <FaYoutube />
            </Link>
          </li>
          <li>
            <Link
              to="https://linkedin.com/company/yourcompany"
              target="_blank"
              aria-label="Follow us on LinkedIn"
            >
              <FaLinkedinIn />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
