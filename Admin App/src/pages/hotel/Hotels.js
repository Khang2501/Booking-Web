import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdWarning,
} from "react-icons/md";
import classes from "../../components/list-items/List.module.css";
import style from "./Hotels.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Hotels = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  //toggle box waring deleted
  const [isToggle, setIsToggle] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  //toggle box error delete

  const [isToggleErr, setIsToggleErr] = useState(false);

  const [resetData, setResetData] = useState(false);
  useEffect(() => {
    axios
      .get("/admin/hotel/all")
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => console.log(err));
  }, [resetData]);

  const toggleBoxWarning = (id) => {
    setIsToggle((state) => !state);
    setIdDelete(id);
  };
  const deleteHotelHandler = () => {
    axios
      .post(`/admin/deleted-hotel/${idDelete}`)
      .then((result) => {
        if (!result.data.status) {
          setIsToggleErr(true);
        }
      })
      .then(() => {
        setResetData((state) => !state);
      })
      .catch((err) => console.log(err));
    toggleBoxWarning();
  };

  return (
    <div className={classes["list-container"]}>
      <div className={style["list-title"]}>
        <p>Hotels List</p>
        <button
          onClick={() => navigate("/add-hotel")}
          className={style["add-new-btn"]}
        >
          Add New
        </button>
      </div>
      <div className={style["table-container"]}>
        <table className={classes["list-table"]}>
          <thead>
            <tr className={style["table-header"]}>
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
                  <span>Name</span>
                  <div></div>
                </div>
              </td>
              <td>
                <div className={classes["checkbox"]}>
                  <span>type</span>
                  <div></div>
                </div>
              </td>
              <td>
                <div className={classes["checkbox"]}>
                  <span>Title</span>
                  <div></div>
                </div>
              </td>
              <td>
                <div className={classes["checkbox"]}>
                  <span>City</span>
                  <div></div>
                </div>
              </td>
              <td>
                <div className={classes["checkbox"]}>
                  <span>Action</span>
                  <div></div>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => {
              return (
                <tr key={data._id} className={style["table-body"]}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{data._id}</td>
                  <td>{data.name}</td>
                  <td>{data.type}</td>
                  <td>{data.name}</td>
                  <td>{data.city}</td>
                  <td>
                    <div className={style["action-btns"]}>
                      <button
                        onClick={() => toggleBoxWarning(data._id)}
                        className={style["delete-btn"]}
                      >
                        Deleted
                      </button>
                      <button
                        onClick={() => {
                          navigate(`/edit-hotel/${data._id}`);
                        }}
                        className={style["edit-btn"]}
                      >
                        Edit
                      </button>
                    </div>
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
      {isToggle && (
        <div className={style["box-warning"]}>
          <button onClick={toggleBoxWarning} className={style["close-btn"]}>
            X
          </button>
          <div className={style["box-main"]}>
            <p>Warning: Definitely delete the hotel?</p>
            <div>
              <button
                onClick={toggleBoxWarning}
                className={style["cancel-btn"]}
              >
                Cancel
              </button>
              <button
                onClick={deleteHotelHandler}
                className={style["accept-btn"]}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {isToggleErr && (
        <div className={style["box-err"]}>
          <div className={style["box-main"]}>
            <div className={style["box-main_err"]}>
              <MdWarning className={style.icon} />
              <div className={style["box-main_err-title"]}>
                <h2>Ooops!</h2>
                <p>The hotel is available in transactions</p>
              </div>
            </div>
            <button
              onClick={() => setIsToggleErr(false)}
              className={style["close-btn"]}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
