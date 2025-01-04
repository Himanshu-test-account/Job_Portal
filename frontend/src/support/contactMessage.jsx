import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactMessages } from '../redux/contactSlice';

const ContactMessages = () => {
  const dispatch = useDispatch();
  const { contactMessages, loading, error } = useSelector((state) => state.contact); // Access contact slice

  useEffect(() => {
    dispatch(fetchContactMessages()); // Fetch contact messages for employees
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Employee Contact Messages</h2>
      <ul>
        {contactMessages.map((message) => (
          <li key={message.id}>
            <p>{message.name}: {message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactMessages;
