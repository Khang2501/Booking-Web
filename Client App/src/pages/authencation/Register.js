import { useRef, useState, useEffect } from "react";
import classes from "./Login.module.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const Register = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const [isNothing, setIsNothing] = useState();
  const [isTaken, setIsTaken] = useState();
  const [isPasswordShort, setIsPasswordShort] = useState();

  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    const newUser = {
      username: userNameRef.current.value,
      password: passwordRef.current.value,
      fullName: "A New User",
      phoneNumber: Number("09090909009"),
      email: userNameRef.current.value,
      isAdmin: false,
    };

    axios
      .post("/add-user", newUser)
      .then((result) => {
        console.log(result.data);
        if (result.data === "Username is nothing!") {
          setIsNothing(true);
          setIsTaken(false);
          setIsPasswordShort(false);
        } else if (!result.data) {
          setIsTaken(true);
          setIsNothing(false);
          setIsPasswordShort(false);
        } else if (result.data === "Password is short") {
          setIsTaken(false);
          setIsNothing(false);
          setIsPasswordShort(true);
        } else if (result.data) {
          navigate("/login");
        }
      })

      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.container}>
      <form onSubmit={loginHandler} className={classes["form-login"]}>
        <h1>Register</h1>
        <input type="text" ref={userNameRef} />
        {isTaken && <p>User name is already taken</p>}
        {isNothing && <p>User name is nothing!</p>}
        <input type="password" ref={passwordRef} />
        {isPasswordShort && <p>Password is short</p>}

        <button>Create Account</button>
      </form>
    </div>
  );
};

export default Register;
