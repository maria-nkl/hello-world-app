import React from 'react';
import { ListGroup } from 'react-bootstrap';

const FeedbackList = ({ feedbacks }) => {
  return (
    <ListGroup className="mt-4">
      {feedbacks.map((feedback, index) => (
        <ListGroup.Item key={index}>
          <strong>{feedback.name}</strong>: {feedback.feedback}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default FeedbackList;