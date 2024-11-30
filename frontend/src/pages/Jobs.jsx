import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

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

  // Fetch jobs based on the selected filters and search keyword
  useEffect(() => {
    if (city || niche || searchKeyword) {
      dispatch(fetchJobs(city, niche, searchKeyword));
    } else {
      // If no filters are applied, fetch all jobs
      dispatch(fetchJobs("", "", ""));
    }
  }, [dispatch, city, niche, searchKeyword]);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
    setSearchKeyword(""); // Reset search keyword when city changes
  };

  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
    setSearchKeyword(""); // Reset search keyword when niche changes
  };

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

  const cities = [
    "New Delhi",
    "Mumbai",
    "Bengaluru",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Ahmedabad",
    "Pune",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Patna",
    "Vadodara",
    "Chandigarh",
    "Coimbatore",
    "Bhopal",
    "Visakhapatnam",
    "Kochi",
    "Goa",
    "Madurai",
    "Agra",
    "Varanasi",
    "Ranchi",
  ];

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <div className="search-tab-wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search for jobs..."
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>

          <div className="wrapper">
            <div className="filter-bar">
              <div className="filter-section cities">
                <h2>Filter by City</h2>
                {cities.map((city, index) => (
                  <div key={index} className="filter-option">
                    <input
                      type="radio"
                      id={city}
                      name="city"
                      value={city}
                      checked={selectedCity === city}
                      onChange={() => handleCityChange(city)}
                      className="filter-input"
                    />
                    <label htmlFor={city} className="filter-label">
                      {city}
                    </label>
                  </div>
                ))}
              </div>

              <div className="filter-section niches">
                <h2>Filter by Niche</h2>
                {nichesArray.map((niche, index) => (
                  <div key={index} className="filter-option">
                    <input
                      type="radio"
                      id={niche}
                      name="niche"
                      value={niche}
                      checked={selectedNiche === niche}
                      onChange={() => handleNicheChange(niche)}
                      className="filter-input"
                    />
                    <label htmlFor={niche} className="filter-label">
                      {niche}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="container">
            <div className="mobile-filter">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="filter-select"
              >
                <option value="">Filter by City</option>
                {cities.map((city, index) => (
                  <option value={city} key={index}>
                    {city}
                  </option>
                ))}
              </select>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="filter-select"
              >
                <option value="">Filter by Niche</option>
                {nichesArray.map((niche, index) => (
                  <option value={niche} key={index}>
                    {niche}
                  </option>
                ))}
              </select>
            </div>

            <div className="jobs_container">
              {jobs && jobs.length === 0 && (
                <p className="no-jobs">
                  No jobs found for your selected filters.
                </p>
              )}
              {jobs &&
                jobs.map((element) => (
                  <div className="card" key={element._id}>
                    {element.hiringMultipleCandidates === "Yes" && (
                      <p className="hiring-multiple">
                        Hiring Multiple Candidates
                      </p>
                    )}
                    <p className="title">{element.title}</p>
                    <p className="company">{element.companyName}</p>
                    <p className="location">{element.location}</p>
                    <p className="salary">{element.salary}</p>
                    <p className="posted">
                      <span>Posted On:</span>
                      {element.jobPostedOn}
                    </p>
                    <div className="btn-wrapper">
                      <Link
                        className="btn apply-btn"
                        to={`/post/application/${element._id}`}
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="fetch-jobs-btn">
            <button onClick={handleSearch} className="fetch-btn">
              Fetch Jobs
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;
