import { useRef, useState, useEffect } from "react";
import classes from "./Login.module.css";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const [isWrongUsername, setIsWrongUsername] = useState(false);
  const [isWrongPassword, setIsWrongPassword] = useState(false);

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
        console.log(result);
        if (result.status === 200) {
          if (result.data === "Username") {
            setIsWrongUsername(true);
            setIsWrongPassword(true);
          } else {
            setIsWrongPassword(true);
          }
        } else {
          const user = result.data;
          sessionStorage.setItem("login", user._id);
          dispatch({ type: "login", payload: user });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.container}>
      <form onSubmit={loginHandler} className={classes["form-login"]}>
        <h1>Login</h1>
        <input
          className={isWrongUsername ? classes.isWrong : classes["input-login"]}
          placeholder="Email"
          type="text"
          ref={userNameRef}
          onChange={() => setIsWrongUsername(false)}
        />
        <input
          className={isWrongPassword ? classes.isWrong : classes["input-login"]}
          placeholder="Password"
          type="password"
          ref={passwordRef}
          onChange={() => setIsWrongPassword(false)}
        />

        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
