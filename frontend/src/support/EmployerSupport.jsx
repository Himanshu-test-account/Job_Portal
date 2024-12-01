import React, { useState } from "react";

const EmployerSupport = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send job posting to an API)
    console.log("Job posted:", { companyName, jobTitle, jobDescription });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Employer Support</h1>
      <p>This page provides resources and help for employers looking to hire talent.</p>

      <section>
        <h2>Post a Job Opening</h2>
        <form onSubmit={handleFormSubmit} style={{ maxWidth: "500px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="companyName" style={{ display: "block" }}>
              Company Name:
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Your company name"
              style={{ padding: "8px", width: "100%", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="jobTitle" style={{ display: "block" }}>
              Job Title:
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Position you're hiring for"
              style={{ padding: "8px", width: "100%", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="jobDescription" style={{ display: "block" }}>
              Job Description:
            </label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Describe the job responsibilities"
              rows="5"
              style={{
                padding: "8px",
                width: "100%",
                borderRadius: "4px",
                border: "1px solid #ccc",
                resize: "vertical",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "10px 15px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Post Job
          </button>
        </form>
      </section>

      <section style={{ marginTop: "20px" }}>
        <h2>Hiring Tips</h2>
        <ul>
          <li>Clearly define job roles and responsibilities.</li>
          <li>Attract top talent by highlighting the benefits of your company.</li>
          <li>Consider using screening questions to narrow down applicants quickly.</li>
          <li>Offer competitive salaries and benefits to retain your talent.</li>
        </ul>
      </section>

      <section style={{ marginTop: "20px" }}>
        <h2>Additional Resources</h2>
        <p>
          Here are some helpful links to improve your hiring process:
        </p>
        <ul>
          <li><a href="https://www.linkedin.com/talent/">LinkedIn Talent Solutions</a></li>
          <li><a href="https://www.glassdoor.com/employers">Glassdoor Employer Center</a></li>
          <li><a href="https://www.hiringlab.org/">Indeed Hiring Lab</a></li>
        </ul>
      </section>
    </div>
  );
};

export default EmployerSupport;
