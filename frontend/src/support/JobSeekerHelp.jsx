import React, { useState } from "react";

const JobSeekerHelp = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Searching for jobs with query:", searchQuery);
    // Implement job search logic here, such as an API call
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Job Seeker Help</h1>
      <p style={styles.paragraph}>Looking for a job? We're here to help you!</p>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Search for Jobs</h2>
        <div style={styles.searchContainer}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Enter job title or keywords"
            style={styles.input}
          />
          <button onClick={handleSearchSubmit} style={styles.searchButton}>
            Search
          </button>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Resume Tips</h2>
        <ul style={styles.list}>
          <li>Tailor your resume for each job you apply for.</li>
          <li>Highlight your skills and accomplishments clearly.</li>
          <li>Keep it concise and focused on your most relevant experience.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Interview Preparation</h2>
        <p style={styles.paragraph}>
          Prepare by researching the company, practicing common interview
          questions, and being ready to discuss your experience in detail.
        </p>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f6f9",
    color: "#333",
    borderRadius: "8px",
    maxWidth: "900px",
    margin: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#333",
    textAlign: "center",
  },
  subHeading: {
    fontSize: "1.8rem",
    color: "#444",
    marginBottom: "10px",
  },
  paragraph: {
    fontSize: "1rem",
    color: "#555",
    textAlign: "center",
    marginBottom: "20px",
  },
  section: {
    marginTop: "30px",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "250px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  searchButton: {
    padding: "10px 15px",
    marginLeft: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  list: {
    paddingLeft: "20px",
    lineHeight: "1.6",
  },
};

export default JobSeekerHelp;
