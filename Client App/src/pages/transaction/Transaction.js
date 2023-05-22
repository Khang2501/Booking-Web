import classes from "./Transaction.module.css";
import Navbar from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import "../../components/header/header.css";

import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Transaction = () => {
  const user = useSelector((state) => state);
  const navigate = useNavigate();
  const [dataTrans, setDataTrans] = useState([]);

  if (!user.isLogin) {
    navigate("/login");
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/transaction/${user.user.username}`)
      .then((result) => {
        setDataTrans(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="header">
        <div className={true ? "headerContainer listMode" : "headerContainer"}>
          <div className="headerList">
            <div className="headerListItem active">
              <FontAwesomeIcon icon={faBed} />
              <span>Stays</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faCar} />
              <span>Car rentals</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faBed} />
              <span>Attractions</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faTaxi} />
              <span>Airport taxis</span>
            </div>
          </div>
        </div>
      </div>
      <main className={classes["transaction-main"]}>
        <h2>Your Transaction</h2>
        <table className={classes["transaction-table"]}>
          <thead>
            <tr className={classes["table-header"]}>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dataTrans.map((trans, index) => {
              return (
                <tr key={trans._id} className={classes["table-body"]}>
                  <td>{`0${index + 1}`}</td>
                  <td>{trans.hotel.name}</td>
                  <td>{trans.rooms.map((r) => `${r}, `)}</td>

                  <td>
                    {trans.dateStart} - {trans.dateEnd}
                  </td>
                  <td>${trans.price}</td>
                  <td>{trans.payment}</td>
                  <td>
                    <span className={classes[`${trans.status}`]}>
                      {trans.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Transaction;
