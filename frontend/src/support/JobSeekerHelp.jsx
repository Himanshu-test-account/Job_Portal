import React, { useState } from "react";

const JobSeekerHelp = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Searching for jobs with query:", searchQuery);
    // Implement job search logic here
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Job Seeker Help</h1>
      <p>Looking for a job? We're here to help you!</p>

      <section>
        <h2>Search for Jobs</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Enter job title or keywords"
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSearchSubmit}
          style={{
            padding: "10px 15px",
            marginLeft: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </section>

      <section style={{ marginTop: "20px" }}>
        <h2>Resume Tips</h2>
        <ul>
          <li>Tailor your resume for each job you apply for.</li>
          <li>Highlight your skills and accomplishments clearly.</li>
          <li>Keep it concise and focused on your most relevant experience.</li>
        </ul>
      </section>

      <section style={{ marginTop: "20px" }}>
        <h2>Interview Preparation</h2>
        <p>Prepare by researching the company, practicing common interview questions, and being ready to discuss your experience in detail.</p>
      </section>
    </div>
  );
};

export default JobSeekerHelp;
