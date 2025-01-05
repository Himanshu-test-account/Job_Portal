import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";

const JobSeekerHelp = () => {
  const [searchQuery, setSearchQuery] = useState(""); // To handle the search query

  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    // Fetch all jobs when the component first mounts
    dispatch(fetchJobs("", "", ""));
  }, [dispatch, error]);

  // Fetch jobs based on the search query
  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchJobs("", "", searchQuery)); // Fetch jobs with the search keyword
    } else {
      dispatch(fetchJobs("", "", "")); // If no keyword, fetch all jobs
    }
  }, [dispatch, searchQuery]);

  const handleSearch = () => {
    dispatch(fetchJobs("", "", searchQuery)); // Fetch jobs with the current search query
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.container}>
          <h1 style={styles.heading}>Job Seeker Help</h1>
          <p style={styles.paragraph}>Looking for a job? We're here to help you!</p>

          <section style={styles.section}>
            <h2 style={styles.subHeading}>Search for Jobs</h2>
            <div style={styles.searchContainer}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                placeholder="Enter job title or keywords"
                style={styles.input}
              />
              <button onClick={handleSearch} style={styles.searchButton}>
                Search
              </button>
            </div>
          </section>

          <section style={styles.section}>
            <div className="jobs_container">
              {jobs && jobs.length === 0 && (
                <p className="no-jobs" style={styles.noJobs}>
                  No jobs found for your search.
                </p>
              )}
              {jobs &&
                jobs.map((element) => (
                  <div className="card" key={element._id} style={styles.card}>
                    <p className="title">{element.title}</p>
                    <p className="company">{element.companyName}</p>
                    <p className="location">{element.location}</p>
                    <p className="salary">{element.salary}</p>
                    <p className="posted">
                      <span>Posted On:</span>
                      {element.jobPostedOn}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        </div>
      )}
    </>
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
  card: {
    padding: "15px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    borderRadius: "4px",
    backgroundColor: "#fff",
  },
  noJobs: {
    textAlign: "center",
    color: "#f00",
  },
};

export default JobSeekerHelp;
