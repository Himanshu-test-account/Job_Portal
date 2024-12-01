import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  // Correct usage of useState hook
  const [show, setShow] = useState(false); // Destructure the state and setter function correctly
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <nav className={show ? "navbar show_navbar" : "navbar"}>
        <div className="logo">
          <img
            src="/Logo.png"
            alt="logo"
            style={{
              width: "80px", // Set width for the image
              height: "80px", // Set height for the image
              borderRadius: "50%", // This makes the logo circular
              objectFit: "cover", // Ensures the image maintains its aspect ratio while covering the circle
              border: "2px solid #000", // Optional: border around the circle (adjust color if needed)
            }}
          />
          <h4>TalentForge</h4>
        </div>
        <div className="links">
          <ul>
            <li>
              <Link to={"/"} onClick={() => setShow(!show)}>
                HOME
              </Link>
            </li>
            <li>
              <Link to={"/jobs"} onClick={() => setShow(!show)}>
                JOBS
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link to={"/dashboard"} onClick={() => setShow(!show)}>
                  DASHBOARD
                </Link>
              </li>
            ) : (
              <li>
                <Link to={"/login"} onClick={() => setShow(!show)}>
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </div>
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </nav>
    </>
  );
};

export default Navbar;
