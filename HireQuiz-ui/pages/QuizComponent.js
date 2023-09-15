// pages\QuizComponent.js
// Created by: Pratham
// Last Updated by: Pratham on 03/08/2023

import React, { Component } from 'react';
import AssessmentReportPage from './AssessmentReportPage'; // Import the AssessmentReportPage component
import quizArray from '../lib/quizData'; 
class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 60,
      quizArray: quizArray,
      questionCount: 0,
      scoreCount: 0,
      displayScore: false,
    };
    this.countdown = null;
  }

  getRandomQuestions = () => {
    let shuffledArray = quizArray.slice(); // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      // Shuffle the array using Fisher-Yates algorithm
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray.slice(0, 10); // Return the first 10 elements as the random questions
  };

  componentDidMount() {
    const randomQuestions = this.getRandomQuestions();
    this.setState({ quizArray: randomQuestions }, () => {
      this.startTimer();
    });
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    this.countdown = setInterval(() => {
      this.setState((prevState) => ({
        timeLeft: prevState.timeLeft - 1,
      }), () => {
        if (this.state.timeLeft === 0) {
          this.stopTimer();
          this.displayNext();
        }
      });
    }, 1000);
  }

  stopTimer = () => {
    clearInterval(this.countdown);
  }

  displayNext = () => {
    const { questionCount, quizArray } = this.state;
    const nextQuestionCount = questionCount + 1;

    if (nextQuestionCount === quizArray.length) {
      this.setState({ displayScore: true });
    } else {
      this.setState({
        questionCount: nextQuestionCount,
        timeLeft: 60,
      });
    }
  };

  logScoreToConsole = () => {
    const { scoreCount, quizArray } = this.state;
    console.log(`Final Score: ${scoreCount} out of ${quizArray.length}`);
  }

  handleNext = () => {
    const { questionCount, quizArray } = this.state;
  
    if (questionCount === quizArray.length - 1) {
      this.setState({ displayScore: true });
      this.stopTimer(); // Stop the timer when the last question is answered
      this.logScoreToConsole();
    } else {
      this.displayNext();
    }
  };
  
  checker = (userOption) => {
    const { questionCount, quizArray, scoreCount } = this.state;
    const question = quizArray[questionCount];
    const options = question.options;
  
    options.forEach((option) => {
      option.status = "";
    });
  
    const selectedOption = options.find((option) => option.text === userOption.text);
    selectedOption.status = "selected";
  
    if (selectedOption.text === question.options[question.correct - 1].text) {
      this.setState((prevState) => ({
        scoreCount: prevState.scoreCount + 1,
      }));
    }
  
    options.forEach((element) => {
      element.disabled = true;
    });
  
    if (questionCount === quizArray.length - 1) {
      this.setState({ displayScore: true });
      this.stopTimer();
      this.logScoreToConsole();
    } else {
      setTimeout(() => {
        this.displayNext();
      }, 500);
    }
  };

  render() {
    const { timeLeft, quizArray, questionCount, scoreCount, displayScore } = this.state;
    const currentQuestion = quizArray[questionCount];

    return (
      <div>
      {displayScore ? (
        <AssessmentReportPage score={scoreCount} totalQuestions={quizArray.length} />
      ) : (
      <div className="quiz-container" style={{ backgroundColor: "#ffffff", padding: "3.1em 1.8em", width: "80%", maxWidth: "37.5em", margin: "0 auto", position: "absolute", transform: "translate(-50%, -50%)", top: "50%", left: "50%", borderRadius: "0.6em", boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)", transformStyle: "preserve-3d", perspective: "800px" }}>
        <div className="header" style={{ marginBottom: "1.8em", display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.6em", borderBottom: "0.1em solid #c0bfd2" }}>
          <div className="number-of-count">
            <span className="number-of-question" style={{ fontWeight: "bold" }}>
              {questionCount + 1} of {quizArray.length} questions
            </span>
          </div>

          <div className="timer-div" style={{ backgroundColor: "#e1f5fe", width: "7.5em", borderRadius: "1.8em", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.7em 1.8em" }}>
            <img src="/timecount.svg" alt="Timer" style={{ height: "1.2em", width: "1.2em" }} />
            <span className="time-left" style={{ fontSize: "1.1em", fontWeight: "bold", color: "#0a69ed" }}>
              {timeLeft}s
            </span>
          </div>
        </div>

        <div id="container">
          <p className="question">{currentQuestion.question}</p>
          <div className="options-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className={`option-div ${option.status}`} style={{ margin: "0.5em" }}>
                <button
                  className={`option-btn ${option.status}`}
                  onClick={() => this.checker(option)}
                  disabled={option.disabled}
                  style={{ backgroundColor: "#ffffff", border: "1px solid #cccccc", padding: "0.5em 1em", borderRadius: "0.3em", cursor: "pointer", transition: "background-color 0.3s ease" }}
                >
                  {option.text}
                </button>
              </div>
            ))}
          </div>
         
          {displayScore && (
            <div className="score-container">
              <div id="user-score" style={{ fontSize: "1.5em", color: "#552121", marginTop: "1.5em", textAlign: "center", transformStyle: "preserve-3d", perspective: "800px" }}>
                Your score is {scoreCount} out of {quizArray.length}
              </div>
            </div>
          )}
        </div>
        <div className="bottom-bar">
          <span id="remaining-questions"></span>
        </div>
      </div>
      )}
      </div>
    );
  }
}

export default QuizComponent;