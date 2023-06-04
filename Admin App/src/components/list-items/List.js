import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import classes from "./List.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/transaction/all")
      .then((result) => {
        setData(result.data.slice(0, 8));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes["list-container"]}>
      <p>Latsest Transaction</p>
      <div className={classes["table-container"]}>
        <table className={classes["list-table"]}>
          <thead>
            <tr className={classes["table-header"]}>
              <td>
                <div className={classes["checkbox"]}>
                  <input type="checkbox" />
                  <div></div>
                </div>
              </td>
              <td>
                <div className={classes["checkbox"]}>
                  <span>ID</span>
                  <div></div>
                </div>
              </td>
              <td>
                <div className={classes["checkbox"]}>
                  <span>User</span>
                  <div></div>
                </div>
              </td>
              <td>
                <div className={classes["checkbox"]}>
                  <span>Hotel</span>
                  <div></div>
                </div>
              </td>
              <td>
                <div className={classes["checkbox"]}>
                  <span>Room</span>
                  <div></div>
                </div>
              </td>
              <td>
                <div className={classes["checkbox"]}>
                  <span>Date</span>
                  <div></div>
                </div>
              </td>
              <td>
                <div className={classes["checkbox"]}>
                  <span>Price</span>
                  <div></div>
                </div>
              </td>
              <td>
                <div className={classes["checkbox"]}>
                  <span>Payment Method</span>
                  <div></div>
                </div>
              </td>
              <td>
                <div className={classes["checkbox"]}>
                  <span>Status</span>
                  <div></div>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => {
              return (
                <tr key={data._id} className={classes["table-body"]}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{data._id}</td>
                  <td>{data.username}</td>
                  <td>{data.hotel.name}</td>
                  <td>{data.rooms.map((room) => `${room}, `)}</td>
                  <td>
                    {data.dateStart} - {data.dateEnd}
                  </td>
                  <td>${data.price}</td>
                  <td>{data.payment}</td>
                  <td>
                    <span className={classes[`${data.status}`]}>
                      {data.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={classes["list-pages"]}>
          <span>1-8 of 8</span>

          <MdKeyboardArrowLeft className={classes.arrow} />

          <MdKeyboardArrowRight className={classes.arrow} />
        </div>
      </div>
    </div>
  );
};

export default List;
