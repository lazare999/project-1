import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";
import Category from "./components/Category";
import Quiz from "./components/Quiz";
// import Test from "./components/Test";

import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "category", element: <Category /> },
  { path: "category/:quizId", element: <Quiz /> },
  // { path: "category/test", element: <Test /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
