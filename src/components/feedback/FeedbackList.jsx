import React from 'react';
import { ListGroup, Spinner, Alert } from 'react-bootstrap';
import { useGetFeedbackQuery } from '../../store/feedbackApi';

const FeedbackList = () => {
  const { data: feedbacks, isLoading, error } = useGetFeedbackQuery();

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error.message}</Alert>;

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