


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupportTicket = () => {
  const [userId, setUserId] = useState(1); // Assume this comes from the logged-in user state or session
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [supportTickets, setSupportTickets] = useState([]);
  const [message, setMessage] = useState('');
  const [formVisible, setFormVisible] = useState(false); // Toggle the visibility of the form

  // Fetch Support Tickets on page load or when the user ID changes
  useEffect(() => {
    const fetchSupportTickets = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/support/by-user?user_id=${userId}`);
        setSupportTickets(response.data); // Assuming the response contains the list of support tickets
      } catch (error) {
        console.error('Error fetching support tickets:', error);
      }
    };

    fetchSupportTickets();
  }, [userId]); // Only refetch tickets when userId changes

  // Handle support ticket submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const ticketData = {
      user_id: userId,
      subject: subject,
      details: details,
    };

    try {
      const response = await axios.post('http://localhost:5000/support/create', ticketData);
      setMessage('Support ticket created successfully!');
      setSubject('');
      setDetails('');

      // Optionally refetch tickets
      const newTickets = await axios.get(`http://localhost:5000/support/by-user?user_id=${userId}`);
      setSupportTickets(newTickets.data);
    } catch (error) {
      console.error('Error creating support ticket:', error);
      setMessage('Failed to create the support ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle the visibility of the support form
  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div className="support-ticket">
      {/* Button to toggle the support ticket form */}
      <button onClick={toggleForm} className="open-support-form-button">
        {formVisible ? 'Close Support Form' : 'Create a Support Ticket'}
      </button>

      {/* Conditional rendering of the support ticket form */}
      {formVisible && (
        <div>
          <h2>Create a Support Ticket</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="details">Details:</label>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Ticket'}
            </button>
          </form>

          {message && <p>{message}</p>}
        </div>
      )}

      <hr />

      <h3>Your Support Tickets</h3>
      <div className="support-tickets-list">
        {supportTickets.length === 0 ? (
          <p>No support tickets found.</p>
        ) : (
          <ul>
            {supportTickets.map((ticket) => (
              <li key={ticket.id}>
                <strong>{ticket.subject}</strong>
                <p>{ticket.details}</p>
                <p>Status: {ticket.status}</p>
                <p>Created at: {new Date(ticket.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SupportTicket;
