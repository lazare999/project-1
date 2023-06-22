import { Link } from "react-router-dom";

import classes from "./Modal.module.css";

const Modal = (props) => {
  const point = props.userPoints;
  const userNameModal = props.userName;
  console.log(userNameModal);

  return (
    <div className={classes.modalWrapper}>
      <div className={classes.modalBackdrop} />
      <div className={classes.modalBox}>
        <div className={classes.modal}>
          <h1>Congrats</h1>
          <h2>You finished the test!</h2>
          <h3>Your score was:</h3>
          <h2>{point}</h2>

          <Link
            className={classes.button}
            to={"/category"}
            state={{ userNameModal: { userNameModal } }}
          >
            Start again!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
