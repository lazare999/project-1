import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import classes from "./Header.module.css";

function Header(props) {
  const location = useLocation();
  const userName = props.userName || location?.state?.userName;
  const navigate = useNavigate();
  function imgHandler() {
    navigate("/?mode=login");
  }

  return (
    <header className={classes.header}>
      <p>welcome: {userName || "test"}</p>
      <img
        src="https://thumbs.dreamstime.com/b/quiz-logo-icon-vector-symbol-flat-cartoon-bubble-speeches-question-check-mark-signs-as-competition-game-interview-160701701.jpg"
        alt="quiz logo"
        width="100"
        height="90"
        onClick={imgHandler}
      />
    </header>
  );
}

export default Header;
