import React from 'react';

const LoadingSpinner = ({fullscreen}) => {
  return fullscreen ? (
    <div className="fullscreen-cover">
      <div className="loading-spinner"></div>
    </div>
  ) : <div className="loading-spinner"></div>;
}

export default LoadingSpinner;
