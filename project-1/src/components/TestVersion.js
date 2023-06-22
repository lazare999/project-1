import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./Category.module.css";

function TestVersion(props) {
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    fetch("https://jservice.io/api/categories?count=5")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const quizCategorys = data.map((quizInfo) => {
          return {
            id: quizInfo.id,
            title: quizInfo.title,
          };
        });

        setQuiz(quizCategorys);
      });
  }, []);

  return (
    <>
      <h1 className={classes.categorys}>Try without authentication</h1>
      <div className={classes.categorys}>
        <ul className={classes.ul}>
          {quiz.map((quizs) => (
            <li className={classes.li} key={quizs.id}>
              <p>
                <Link className={classes.listP} to={`category/${quizs.id}`}>
                  {quizs.title}
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TestVersion;
