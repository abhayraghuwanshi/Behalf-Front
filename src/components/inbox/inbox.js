import React from 'react';
import './inbox.css';

const userEmail = 'user@example.com'; // Example email, replace with dynamic data in real implementation

const messages = [
  { id: 1, from: 'John Doe', subject: 'Meeting Tomorrow', content: 'Hey, just a reminder about our meeting tomorrow at 10am.' },
  { id: 2, from: 'Jane Smith', subject: 'Project Update', content: 'I’ve made some updates to the project. Please review them.' },
  { id: 3, from: 'Alice Johnson', subject: 'Weekend Plans', content: 'Are you free this weekend for a quick catch-up?' }
];

const Inbox = () => {
  return (
    <div className="inbox">
      <h2>Inbox</h2>
      <div className="user-email">
        <strong>Email:</strong> {userEmail}
      </div>
      <div className="messages">
        {messages.map(message => (
          <div className="message-card" key={message.id}>
            <h3>From: {message.from}</h3>
            <p><strong>Subject:</strong> {message.subject}</p>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;
