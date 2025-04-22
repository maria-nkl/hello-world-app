// import React from 'react';
// import { ListGroup } from 'react-bootstrap';

// const FeedbackList = ({ feedbacks }) => {
//   return (
//     <ListGroup className="mt-4">
//       {feedbacks.map((feedback, index) => (
//         <ListGroup.Item key={index}>
//           <strong>{feedback.name}</strong>: {feedback.feedback}
//         </ListGroup.Item>
//       ))}
//     </ListGroup>
//   );
// };

// export default FeedbackList;


import React from 'react';
import { ListGroup } from 'react-bootstrap';

const FeedbackList = ({ feedbacks, isDark }) => {
  return (
    <ListGroup variant={isDark ? 'flush' : ''}>
      {feedbacks.map((feedback) => (
        <ListGroup.Item 
          key={feedback.id} 
          className={isDark ? 'bg-dark text-white' : ''}
        >
          <div className="d-flex justify-content-between">
            <strong>{feedback.author || 'Аноним'}</strong>
            <small>
              {new Date(feedback.timestamp).toLocaleDateString()}
            </small>
          </div>
          <div className="mt-2">{feedback.text}</div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default FeedbackList;