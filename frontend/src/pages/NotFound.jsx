import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="notFound">
      <div className="container">
        <h1>404 Not Found</h1>
        <p>Your visited page was not found. You may return to the home page.</p>
        <Link to="/" className="btn">
          Back to Home Page
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
