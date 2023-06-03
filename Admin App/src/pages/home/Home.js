import {
  MdPersonOutline,
  MdOutlineShoppingCart,
  MdCreditCard,
} from "react-icons/md";
import { BsCoin } from "react-icons/bs";
import classes from "./Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import List from "../../components/list-items/List";
const Home = () => {
  const [dataInfor, setDataInfor] = useState({
    users: 100,
    orders: 100,
    totalPrice: 100,
    balance: 100,
  });
  useEffect(() => {
    axios
      .get("/admin/infor")
      .then((infor) => {
        setDataInfor(infor.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={classes["home-container"]}>
      <header className={classes["home-header"]}>
        <div className={classes["home-inforBoard"]}>
          <p>USERS</p>
          <p>{dataInfor.users}</p>
          <MdPersonOutline
            className={`${classes["icon-element"]} ${classes["red"]}`}
          />
        </div>
        <div className={classes["home-inforBoard"]}>
          <p>ORDERS</p>
          <p>{dataInfor.orders}</p>
          <MdOutlineShoppingCart
            className={`${classes["icon-element"]} ${classes["yellow"]}`}
          />
        </div>
        <div className={classes["home-inforBoard"]}>
          <p>EARNINGS</p>
          <p>$ {dataInfor.totalPrice}</p>
          <BsCoin
            className={`${classes["icon-element"]} ${classes["green"]}`}
          />
        </div>
        <div className={classes["home-inforBoard"]}>
          <p>BALANCE</p>
          <p>$ {dataInfor.balance}</p>
          <MdCreditCard
            className={`${classes["icon-element"]} ${classes["purple"]}`}
          />
        </div>
      </header>
      <div className={classes["home-main"]}>
        <List />
      </div>
    </div>
  );
};

export default Home;
