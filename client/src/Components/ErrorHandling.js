// ArtworkErrors.jsx
import React from 'react';

const ErrorHandling = ({ errors }) => {
  //console.error("in errors", errors);

  // Handle errors array accordingly, e.g., join them into a string
  const errorMessage = errors && errors.join(', ');

  return (
    <div style={{ color: 'red' }}>
      <p>Error occurred: {errorMessage}</p>
    </div>
  );
};

export default ErrorHandling;
