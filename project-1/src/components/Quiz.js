import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./Header";
import Modal from "./Modal";

import classes from "./Quiz.module.css";

function Quiz(props) {
  const params = useParams();
  const category = params.quizId;
  console.log(category);

  const location = useLocation();

  const userName = location.state?.from?.sendThisName;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quest, setQuest] = useState([]);

  const [userAnswer, setUserAnswer] = useState("");

  const [points, setPoints] = useState(0);

  const [greenPoint, setGreenPoint] = useState(false);
  const [redPoint, setRedPoint] = useState(false);

  useEffect(() => {
    fetch("https://jservice.io/api/category?id=" + category)
      .then((response) => response.json())
      .then((data) => {
        const newQuestions = data.clues.map((clue) => {
          return {
            answer: clue.answer,
            question: clue.question,
            id: clue.id,
            title: data.title,
          };
        });

        setQuest(newQuestions);
      });
  }, [category]);

  function answerHandler(event) {
    setUserAnswer(event.target.value);
  }

  function goToNextQuestion(event) {
    if (userAnswer === currentQuestion.answer) {
      setPoints(points + 1);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setGreenPoint(true);
      setRedPoint(false);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex);
      setPoints(points);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setRedPoint(true);
      setGreenPoint(false);
    }

    setUserAnswer("");
  }

  useEffect(() => {
    let timer;
    if (greenPoint) {
      timer = setTimeout(() => {
        setGreenPoint(false);
      }, 1000);
    }
    if (redPoint) {
      timer = setTimeout(() => {
        setRedPoint(false);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [greenPoint, redPoint]);

  if (quest.length === 0 || currentQuestionIndex >= quest.length) {
    // Quiz is still loading or there are no more questions
    return <div className={classes.loading}>Loading...</div>;
  }

  const currentQuestion = quest[currentQuestionIndex];

  return (
    <>
      <Header userName={userName} />
      <div className={classes.quiz}>
        <h2>Test: {currentQuestion.title}</h2>
        <h2>{currentQuestionIndex + 1}/15</h2>
        <h3>{currentQuestion.question}</h3>
        <br />
        <h3>{currentQuestion.answer}</h3>
        <input className={classes.input} type="text" onChange={answerHandler} />

        <button onClick={goToNextQuestion}>Submit</button>

        <h3
          className={`${classes.points} ${
            greenPoint ? classes.green : redPoint ? classes.red : classes.black
          }`}
        >
          {points}
        </h3>
        {currentQuestionIndex === 15 && (
          <Modal userPoints={points} userName={userName} />
        )}
      </div>
    </>
  );
}

export default Quiz;
