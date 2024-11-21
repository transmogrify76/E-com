

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterDate, setFilterDate] = useState(''); // State for filtering by createdAt or updatedAt
  const [ticketDetails, setTicketDetails] = useState(null); // Store details of a single ticket
  const [statusUpdate, setStatusUpdate] = useState(''); // State for updating ticket status
  const [statusMessage, setStatusMessage] = useState(''); // Store success or error message after update

  // Fetch all support tickets from backend
  const fetchAllTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/support');
      setTickets(response.data);
    } catch (err) {
      setError('Error fetching tickets.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch tickets by created date
  const fetchTicketsByCreatedDate = async () => {
    if (!filterDate) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/support/by-created-date?createdAt=${filterDate}`);
      setTickets(response.data);
    } catch (err) {
      setError('Error fetching tickets by created date.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch tickets by updated date
  const fetchTicketsByUpdatedDate = async () => {
    if (!filterDate) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/support/by-updated-date?updatedAt=${filterDate}`);
      setTickets(response.data);
    } catch (err) {
      setError('Error fetching tickets by updated date.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single support ticket by ID
  const fetchTicketById = async (ticketId) => {
    try {
      const response = await axios.get(`http://localhost:5000/support/${ticketId}`);
      setTicketDetails(response.data);
    } catch (err) {
      setError('Error fetching ticket details.');
    }
  };

  // Handle updating ticket status
  const handleStatusUpdate = async () => {
    if (!ticketDetails || !statusUpdate) return;
    setLoading(true);
    setError(null);
    setStatusMessage('');

    try {
      await axios.patch('http://localhost:5000/support/update-status', {
        ticket_id: ticketDetails.id,
        status: statusUpdate,
      });

      setStatusMessage('Ticket status updated successfully.');
      setTicketDetails(prevDetails => ({
        ...prevDetails,
        status: statusUpdate,
      }));
      setStatusUpdate('');
    } catch (err) {
      setError('Error updating ticket status.');
    } finally {
      setLoading(false);
    }
  };

  // Handle filtering change
  const handleFilterDateChange = (event) => {
    setFilterDate(event.target.value);
  };

  // Handle filter submission
  const handleFilterSubmit = (event) => {
    event.preventDefault();
    fetchTicketsByCreatedDate();
    fetchTicketsByUpdatedDate();
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  return (
    <div className="ticket-container">
      <h1>All Support Tickets</h1>

      {/* Filter Form */}
      <form onSubmit={handleFilterSubmit} className="filter-form">
        <label htmlFor="filterDate">Filter by Date (created/updated):</label>
        <input
          type="datetime-local"
          id="filterDate"
          value={filterDate}
          onChange={handleFilterDateChange}
        />
        <button type="submit">Filter</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {ticketDetails ? (
        // Ticket Details View
        <div className="ticket-details">
          <h2>Ticket Details</h2>
          <p><strong>Subject:</strong> {ticketDetails.subject}</p>
          <p><strong>Status:</strong> {ticketDetails.status}</p>
          <p><strong>Details:</strong> {ticketDetails.details}</p>
          <p><strong>Created At:</strong> {new Date(ticketDetails.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(ticketDetails.updatedAt).toLocaleString()}</p>

          {/* Status Update Section */}
          <div className="status-update">
            <label htmlFor="status">Update Status:</label>
            <select
              id="status"
              value={statusUpdate}
              onChange={(e) => setStatusUpdate(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="CLOSED">Closed</option>
            </select>
            <button onClick={handleStatusUpdate} disabled={loading}>Update Status</button>
            {statusMessage && <p className="success">{statusMessage}</p>}
          </div>

          <button onClick={() => setTicketDetails(null)}>Back to Tickets List</button>
        </div>
      ) : (
        // Tickets List
        <div className="ticket-list">
          {tickets.length === 0 ? (
            <p>No tickets available.</p>
          ) : (
            tickets.map((ticket) => (
              <div className="ticket-item" key={ticket.id}>
                <h3>{ticket.subject}</h3>
                <p><strong>Status:</strong> {ticket.status}</p>
                <p><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(ticket.updatedAt).toLocaleString()}</p>
                <button onClick={() => fetchTicketById(ticket.id)}>View Details</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SupportTickets;
