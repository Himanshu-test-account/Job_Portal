import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const HowItWorks = () => {
  return (
    <section className="howItWorks">
      <h3>How Does It Work?</h3>
      <div className="container">
        <div className="card">
          <div className="icon">
            <LuUserPlus />
          </div>
          <h4>Create an Account</h4>
          <p>
            Whether you're a job seeker or an employer, start by signing up for
            a free account. Create a personalized profile, including your
            skills, qualifications, and work preferences. It only takes a few
            minutes to get started and unlock access to job opportunities or job
            postings.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <VscTasklist />
          </div>
          <h4>Post or Apply for Jobs</h4>
          <p>
            Once your profile is set up, employers can post job listings, while
            job seekers can browse and apply for available positions. Use
            advanced filters to find the perfect match for your skills, or
            customize your job post to attract top talent. The platform connects
            you with the right opportunities faster than ever.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <BiSolidLike />
          </div>
          <h4>Engage and Get Hired</h4>
          <p>
            As an employer, engage with job seekers by reviewing resumes,
            scheduling interviews, and making job offers. As a job seeker,
            interact with employers, follow up on job applications, and secure
            your dream job. Stay connected and make informed decisions with ease
            on this platform.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
