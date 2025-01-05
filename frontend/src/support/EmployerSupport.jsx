import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postJob } from "../store/slices/jobSlice";
import { toast } from "react-toastify";

const EmployerSupport = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");

  const dispatch = useDispatch();

  const handlePostJob = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("jobTitle", jobTitle);
    formData.append("jobDescription", jobDescription);

    dispatch(postJob(formData))
      .then(() => {
        toast.success("Job posted successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Employer Support</h1>
      <p style={styles.paragraph}>This page provides resources and help for employers looking to hire talent.</p>

      <section>
        <h2 style={styles.subHeading}>Post a Job Opening</h2>
        <form style={styles.form} onSubmit={handlePostJob}>
          <div style={styles.inputGroup}>
            <label htmlFor="companyName" style={styles.label}>Company Name:</label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Your company name"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="jobTitle" style={styles.label}>Job Title:</label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Position you're hiring for"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="jobDescription" style={styles.label}>Job Description:</label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Describe the job responsibilities"
              rows="5"
              style={styles.textarea}
            />
          </div>
          <button type="submit" style={styles.submitButton}>Post Job</button>
        </form>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    color: "#333",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "900px",
    margin: "auto",
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
  form: {
    maxWidth: "500px",
    margin: "auto",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "600",
    color: "#333",
  },
  input: {
    padding: "10px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  textarea: {
    padding: "10px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "vertical",
    fontSize: "1rem",
  },
  submitButton: {
    padding: "12px 18px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    width: "100%",
  },
};

export default EmployerSupport;
