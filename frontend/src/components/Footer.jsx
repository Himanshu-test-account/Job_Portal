import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <footer>
        <div>
          <img src="/Logo.png" alt="Logo" />
        </div>
        <div>
          <h1>Support</h1>
          <ul>
            <li>Job Seeker Help</li>
            <li>Employer Support</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h4>Follow Us</h4>
          <ul>
            <li>
              <Link to="https://twitter.com/yourprofile" target="_blank" aria-label="Follow us on Twitter">
                <FaTwitter />
                <span>Twitter</span>
              </Link>
            </li>
            <li>
              <Link to="https://instagram.com/yourprofile" target="_blank" aria-label="Follow us on Instagram">
                <FaInstagram />
                <span>Instagram</span>
              </Link>
            </li>
            <li>
              <Link to="https://youtube.com/yourchannel" target="_blank" aria-label="Follow us on YouTube">
                <FaYoutube />
                <span>YouTube</span>
              </Link>
            </li>
            <li>
              <Link to="https://linkedin.com/company/yourcompany" target="_blank" aria-label="Follow us on LinkedIn">
                <FaLinkedinIn />
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>

      <div className="copyright">
        &copy; {new Date().getFullYear()} All Rights Reserved By Himanshu Yadav
      </div>
    </>
  );
};

export default Footer;
