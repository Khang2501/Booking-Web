import { useRef, useState, useEffect } from "react";
import classes from "./Login.module.css";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const [isWrong, setIsWrong] = useState();
  const navigate = useNavigate();

  const loginStore = useSelector((state) => state);

  if (loginStore.isLogin === true) {
    navigate("/");
  }

  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();

    axios
      .post("/user", {
        username: userNameRef.current.value,
        password: passwordRef.current.value,
      })
      .then((result) => {
        if (!result.data) {
          setIsWrong(true);
        } else {
          const user = result.data;
          setIsWrong(false);

          dispatch({ type: "login", payload: user });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.container}>
      <form onSubmit={loginHandler} className={classes["form-login"]}>
        <h1>Login</h1>
        <input placeholder="Email" type="text" ref={userNameRef} />
        <input placeholder="Password" type="password" ref={passwordRef} />
        {isWrong && <p>User name or Password went wrong!</p>}
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
