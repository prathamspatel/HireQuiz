// pages\AssessmentReportPage.js
// Created by: Pratham, Parita
// Last Updated by: Parita on Aug 02
import React from 'react';

const AssessmentReportPage = ({ score, totalQuestions }) => {
  const percentage = ((score / totalQuestions) * 100);
  let feedback;
  let detailedFeedback;

  if (percentage >= 80) {
    feedback = 'Good';
    detailedFeedback = 'Congratulations on your outstanding performance! Your assessment results indicate that you have excelled beyond expectations.';
  } else if (percentage >= 50 && percentage < 80) {
    feedback = 'Needs Improvement';
    detailedFeedback = 'Great effort! Your assessment results indicate that you are on the right track, but there is room for improvement. Identify areas where you can enhance your skills and knowledge, and keep pushing yourself to reach your full potential.';
  } else {
    feedback = 'Bad';
    detailedFeedback = 'We acknowledge your efforts in taking the assessment, but it appears there is room for improvement. Remember, setbacks are an opportunity for growth. Take this as a chance to reassess your approach and identify areas that need attention.';
  }

  let percentageColorClass;
  if (feedback === 'Good') {
    percentageColorClass = 'btn btn-primary bg-green'; 
  } else if (feedback === 'Bad') {
    percentageColorClass = 'btn btn-primary bg-red'; 
  } else {
    percentageColorClass = 'btn btn-primary bg-yellow'; 
  }

  return (
    <div className="assessment-report-container">
      <div className="row">
      <h2><b>Assessment Report</b></h2>    
        <div className="col-md-7">
        <br />
          <h4>Thank you for taking the Assessment!</h4>
          <h5>Please monitor your email for job updates.</h5>
          <br />
          <p className={percentageColorClass}><strong>Attempt score: {percentage}%</strong></p>
          <br/>
          <p>Feedback: {detailedFeedback}</p>
        </div>
        <div className="col-md-5">
          <img src="https://previews.123rf.com/images/kebox/kebox1806/kebox180600136/102510777-icon-of-written-papers-with-green-tick.jpg" alt="HireQuiz.ca" height="300" width="300" />
        </div>
      </div>
    </div>
  );
};

export default AssessmentReportPage;

