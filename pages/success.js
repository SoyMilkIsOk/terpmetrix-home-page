import React from 'react';
import { useHistory } from 'react-router-dom';

const SuccessPage = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div>
      <h1>Success!</h1>
      <p>Your form has been submitted successfully.</p>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default SuccessPage;