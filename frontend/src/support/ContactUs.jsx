import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../store/slices/contactSlice';

const ContactForm = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.contact); // Access contact slice

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Basic validation for the form
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.message) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm(); // Validate form inputs
    setFormErrors(errors); // Set the errors
    if (Object.keys(errors).length > 0) return; // Prevent form submission if there are validation errors

    dispatch(submitContactForm(formData)); // Dispatch action to submit the contact form
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
          {formErrors.name && <p className="error">{formErrors.name}</p>}
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
          />
          {formErrors.message && <p className="error">{formErrors.message}</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      {/* Add styles directly within the component */}
      <style jsx>{`
        .contact-form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h2 {
          font-size: 28px;
          margin-bottom: 20px;
          color: #333;
          text-align: center;
        }

        .form-group {
          margin-bottom: 15px;
        }

        input,
        textarea {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border-radius: 4px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          font-size: 16px;
        }

        textarea {
          resize: vertical;
          min-height: 150px;
        }

        button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 4px;
          width: 100%;
          transition: background-color 0.3s ease;
        }

        button:disabled {
          background-color: #ddd;
          cursor: not-allowed;
        }

        button:hover:enabled {
          background-color: #0056b3;
        }

        .error {
          color: red;
          font-size: 14px;
          margin-top: 5px;
        }

        .success {
          color: green;
          font-size: 16px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
