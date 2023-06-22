import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";

import classes from "./Category.module.css";

function Category(props) {
  const location = useLocation();
  const userName = location?.state?.userName;

  const names = location?.state?.userNameModal?.userNameModal;
  console.log(names);

  const sendThisName = names || userName;
  console.log(sendThisName);

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

  
  if (quiz.length === 0) {
    // Quiz is still loading or there are no more questions
    return <div className={classes.loading}>Loading...</div>;
  }

  return (
    <>
      <Header userName={names || userName} />
      <h1 className={classes.categorys}>Choose test category</h1>
      <div className={classes.categorys}>
        <ul className={classes.ul}>
          {quiz.map((quizs) => (
            <li className={classes.li} key={quizs.id}>
              <p>
                <Link
                  className={classes.listP}
                  to={`${quizs.id}`}
                  state={{ from: { sendThisName } }}
                >
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

export default Category;
