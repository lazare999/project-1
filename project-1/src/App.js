import Login from "../src/components/Login";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Login />
      <Outlet />
    </>
  );
}

export default App;
