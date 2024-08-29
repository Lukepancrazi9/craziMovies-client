import React from 'react';
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

export const UserInfo = ({ username, email }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <h2>Account Information</h2>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
      </Card.Body>
    </Card>
  );
};

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};