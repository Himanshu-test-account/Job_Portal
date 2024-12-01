import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to API or email)
    console.log("Form submitted with data:", formData);
    // Clear the form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Contact Us</h1>
      <p>If you have any questions or need assistance, feel free to contact us!</p>

      <section>
        <h2>Contact Form</h2>
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="name" style={{ display: "block" }}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              style={{
                padding: "8px",
                width: "100%",
                borderRadius: "4px",
                border: "1px solid #ccc"
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="email" style={{ display: "block" }}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              style={{
                padding: "8px",
                width: "100%",
                borderRadius: "4px",
                border: "1px solid #ccc"
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="subject" style={{ display: "block" }}>Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject of your message"
              style={{
                padding: "8px",
                width: "100%",
                borderRadius: "4px",
                border: "1px solid #ccc"
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="message" style={{ display: "block" }}>Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              rows="5"
              style={{
                padding: "8px",
                width: "100%",
                borderRadius: "4px",
                border: "1px solid #ccc",
                resize: "vertical"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 15px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Send Message
          </button>
        </form>
      </section>

      <section style={{ marginTop: "30px" }}>
        <h2>Our Contact Details</h2>
        <p>If you prefer to contact us directly, here are our details:</p>
        <ul>
          <li>Email: <a href="mailto:info@example.com">info@example.com</a></li>
          <li>Phone: +1 234 567 890</li>
          <li>Address: 1234 Some St, City, Country</li>
        </ul>
      </section>
    </div>
  );
};

export default ContactUs;
