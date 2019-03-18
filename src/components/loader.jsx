import React from 'react';
import './loader.scss';

const SpinnerPage = () => (
  <>
    <div className="spinner-grow text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </>
);

export default SpinnerPage;
