import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import Quiz from "./Quiz";
import useInput from "../hooks/use-input";

import classes from "./Login.module.css";
import TestVersion from "./TestVersion";

function Login(props) {
  const [targetName, setTargetName] = useState("");

  const [searchParms] = useSearchParams();
  const isLogin = searchParms.get("mode") === "login";

  const {
    value: enteredName,
    isValid: entereNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim(""));

  const {
    value: enteredGmail,
    isValid: entereGmailIsValid,
    hasError: GmailInputHasError,
    valueChangeHandler: gmailChangeHandler,
    inputBlurHandler: gmailBlurHandler,
    reset: resetGmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enterePasswordIsValid,
    hasError: PasswordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim(""));

  let formIsValid = false;

  if (entereGmailIsValid && enterePasswordIsValid) {
    formIsValid = true;
  }

  const navigate = useNavigate();

  async function formSignupHandler(event) {
    event.preventDefault();

    const forDataStorage = {
      name: enteredName,
      email: enteredGmail,
      
    };

    const response = await fetch(
      "https://project-1-1a2e3-default-rtdb.firebaseio.com/user.json",
      {
        method: "POST",
        body: JSON.stringify(forDataStorage),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);

    createUserWithEmailAndPassword(
      auth,
      enteredGmail,
 
      enteredName
    )
      .then((userCredential) => {
        console.log(userCredential);

        const token = userCredential.user.accessToken;
        localStorage.setItem("token", token);
        setTargetName(enteredName);
        navigate("/category", { state: { userName: enteredName } });
      })
      .catch((error) => {
        console.log(error);
      });

    if (!entereNameIsValid) {
      return;
    }
    if (!entereGmailIsValid) {
      return;
    }
    if (!enterePasswordIsValid) {
      return;
    }

    resetNameInput();
    resetGmailInput();
    resetPasswordInput();
  }

  async function formLoginHanlder(event) {
    event.preventDefault();

    signInWithEmailAndPassword(auth, enteredGmail, enteredPassword, enteredName)
      .then((userCredential) => {
        console.log(userCredential);

        const token = userCredential.user.accessToken;
        localStorage.setItem("token", token);

        fetch("https://project-1-1a2e3-default-rtdb.firebaseio.com/user.json")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch data from the server.");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);

            let targetName = null;
            for (const key in data) {
              if (data[key].email === enteredGmail) {
                targetName = data[key].name;
                break;
              }
            }
            console.log(targetName);
            setTargetName(targetName);
            navigate("/category", { state: { userName: targetName } });
          });
      })
      .catch((error) => {
        console.log(error);
      });
    if (!entereNameIsValid) {
      return;
    }
    if (!entereGmailIsValid) {
      return;
    }
    if (!enterePasswordIsValid) {
      return;
    }

    resetNameInput();
    resetGmailInput();
    resetPasswordInput();
  }

  return (
    <>
      <div className={classes.flexcontainer}>
        <div>{targetName && <Quiz targetName={targetName} />}</div>
        <div className={classes.flexchild}>
          {!isLogin && <TestVersion />}
          <div>
            {isLogin && (
              <form className={classes.form} onSubmit={formLoginHanlder}>
                <img
                  src="https://muralsyourway.vtexassets.com/arquivos/ids/241676/Bookshelf-Mural-Wallpaper.jpg?v=638165377483700000"
                  alt="Books"
                  width="100%"
                  height="100%"
                  className={classes.imgR}
                />
                <div className={classes.cover}>
                  <h1>LOGIN</h1>
                  <div className={classes.inputs}>
                    <div className={classes.emailInput}>
                      <label className={classes.label}>Emial</label>
                      <input
                        type="email"
                        id="eame"
                        placeholder="Enter your email"
                        onChange={gmailChangeHandler}
                        onBlur={gmailBlurHandler}
                        value={enteredGmail}
                      />

                      {GmailInputHasError && (
                        <p className={classes.error}>
                          Please enter a valid email.
                        </p>
                      )}
                    </div>
                    <div className={classes.passwordInput}>
                      <label className={classes.label}>Password</label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        value={enteredPassword}
                      />
                    </div>
                    {PasswordHasError && (
                      <p className={classes.error}>
                        Password was not corrects.
                      </p>
                    )}
                  </div>
                  <div>
                    <button className={classes.submit} disabled={!formIsValid}>
                      Submit
                    </button>
                  </div>
                  <div className={classes.btndiv}>
                    <button className={classes.button}>
                      Forgot a password?
                    </button>
                    <Link
                      to={`?mode=${isLogin ? "signup" : "login"}`}
                      className={classes.button}
                    >
                      {isLogin ? "signup" : "login"}
                    </Link>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className={classes.flexchild}>
          <div className={classes.welcome}>
            {isLogin && <TestVersion />}
            {!isLogin && (
              <form className={classes.form} onSubmit={formSignupHandler}>
                <img
                  src="https://muralsyourway.vtexassets.com/arquivos/ids/241676/Bookshelf-Mural-Wallpaper.jpg?v=638165377483700000"
                  alt="Books"
                  width="100%"
                  height="100%"
                  className={classes.imgL}
                />
                <div className={classes.cover}>
                  <h1>SIGNUP</h1>
                  <div className={classes.inputs}>
                    <div className={classes.emailInput}>
                      <label className={classes.label}>Name</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="enrete your name"
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                        value={enteredName}
                      />
                      {nameInputHasError && (
                        <p className={classes.error}>Enter valid name.</p>
                      )}
                    </div>
                    <div className={classes.emailInput}>
                      <label className={classes.label}>Email</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="entere your email"
                        onChange={gmailChangeHandler}
                        onBlur={gmailBlurHandler}
                        value={enteredGmail}
                      />
                      {GmailInputHasError && (
                        <p className={classes.error}>Enter valid email.</p>
                      )}
                    </div>
                    <div className={classes.passwordInput}>
                      <label className={classes.label}>Password</label>
                      <input
                        type="password"
                        id="password"
                        placeholder="entere your password"
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        value={enteredPassword}
                      />
                      {PasswordHasError && (
                        <p className={classes.error}>Entere valid password.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className={classes.submit}
                      disabled={!formIsValid}
                    >
                      Submit
                    </button>
                  </div>
                  <div className={classes.btn}>
                    <button>Forgot a password?</button>
                    <Link
                      to={`?mode=${isLogin ? "signup" : "login"}`}
                      className={classes.button}
                    >
                      {isLogin ? "signup" : "login"}
                    </Link>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
