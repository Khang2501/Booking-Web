import {
  MdDashboard,
  MdPersonOutline,
  MdOutlineStoreMallDirectory,
  MdCreditCard,
  MdLogout,
} from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import classes from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
const Navbar = () => {
  const action = useDispatch();

  const navigate = useNavigate();
  return (
    <nav className={classes["navbar-container"]}>
      <h2>Admin Page</h2>
      <main className={classes.navbar}>
        <span>MAIN</span>
        <div className={classes["navbar-element"]}>
          <MdDashboard />
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Dashboard
          </button>
        </div>
        <span>LISTS</span>
        <div className={classes["navbar-element"]}>
          <MdPersonOutline />
          <button>Users</button>
        </div>
        <div className={classes["navbar-element"]}>
          <MdOutlineStoreMallDirectory />
          <button
            onClick={() => {
              navigate("/hotels");
            }}
          >
            Hotels
          </button>
        </div>
        <div className={classes["navbar-element"]}>
          <MdCreditCard />
          <button
            onClick={() => {
              navigate("/rooms");
            }}
          >
            Rooms
          </button>
        </div>
        <div className={classes["navbar-element"]}>
          <AiOutlineTransaction />
          <button
            onClick={() => {
              navigate("/transaction");
            }}
          >
            Transactions
          </button>
        </div>
        <span>NEW</span>
        <div className={classes["navbar-element"]}>
          <MdOutlineStoreMallDirectory />
          <button onClick={() => navigate("/add-hotel")}>New Hotel</button>
        </div>
        <div className={classes["navbar-element"]}>
          <MdCreditCard />
          <button
            onClick={() => {
              navigate("/add-room");
            }}
          >
            New Room
          </button>
        </div>
        <span>USER</span>
        <div className={classes["navbar-element"]}>
          <MdLogout />
          <button
            onClick={() => {
              action({ type: "logout" });
            }}
          >
            Logout
          </button>
        </div>
      </main>
    </nav>
  );
};

export default Navbar;
