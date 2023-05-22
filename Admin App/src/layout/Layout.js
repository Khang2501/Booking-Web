import Navbar from "../components/navbar/Navbar";
import classes from "./Layout.module.css";
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
const Layout = (props) => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.isLogin);
  if (!isLogin) {
    return (
      <div className={classes["login-container"]}>
        <Stack spacing={2} direction="row">
          <Button
            onClick={() => {
              navigate("/login");
            }}
            variant="contained"
          >
            Login
          </Button>
        </Stack>
      </div>
    );
  } else {
    return (
      <div className={classes["admin-container"]}>
        <Navbar />
        <div>
          <div className={classes["main-top"]}></div>
          {props.children}
        </div>
      </div>
    );
  }
};

export default Layout;
