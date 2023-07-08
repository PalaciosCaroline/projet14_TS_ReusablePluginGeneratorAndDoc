import React from 'react';
import errorLoading from './../assets/errorLoading.jpg';

const ErrorLoadingData = () => (
  <>
    <h1 className="titleErrorLoading">
      Sorry, there was a problem loading the employee data. Please try again
      later.
    </h1>
    <div className="box_imgErrorLoading">
      <img src={errorLoading} alt="image de bobine emmélée" />
    </div>
  </>
);

export default ErrorLoadingData;
