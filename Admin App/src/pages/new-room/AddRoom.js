import classes from "../new-hotel/AddHotel.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";

import { useNavigate } from "react-router-dom";
const AddRoom = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [maxPeople, setMaxPeople] = useState(0);
  const [description, setDescription] = useState("");
  const [rooms, setRooms] = useState("");
  const [chooseHotel, setChooseHotel] = useState();

  const [dataHotels, setDataHotels] = useState([]);
  const [toggleWarning, setToggleWarning] = useState(false);

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/admin/hotel/all")
      .then((result) => {
        const arr = result.data.map((res) => {
          return {
            _id: res._id,
            name: res.name,
          };
        });
        setDataHotels(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      title === "" ||
      price <= 0 ||
      maxPeople <= 0 ||
      description === "" ||
      rooms === ""
    ) {
      setToggleWarning(true);
    } else {
      axios
        .post("/admin/add-new-room", {
          title: title,
          price: price,
          maxPeople: maxPeople,
          desc: description,
          roomNumbers: rooms.split(",").map((num) => Number(num)),
        })
        .then((res) => {
          if (res.data) setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={classes["add-container"]}>
      {toggleWarning && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert
            severity="warning"
            onClose={() => {
              setToggleWarning(false);
            }}
          >
            <AlertTitle>Warning</AlertTitle>
            Fill full the information
          </Alert>
        </Stack>
      )}
      {success && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert
            onClose={() => {
              setSuccess((suc) => !suc);
              navigate("/rooms");
            }}
          >
            Add Room success
          </Alert>
        </Stack>
      )}
      <div className={classes["add-title"]}>Add New Room</div>
      <main className={classes["add-main"]}>
        <form onSubmit={submitHandler} className={classes["form-add"]}>
          <div>
            <div className={classes["form-add_top"]}>
              <div className={classes["form-add_element"]}>
                <label>Title</label>
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="2 bed room"
                />
              </div>
              <div className={classes["form-add_element"]}>
                <label>Price</label>
                <input
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="350"
                />
              </div>
              <div className={classes["input-img"]}>
                <label>Rooms</label>
                <input
                  type="text"
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="End of room by comma"
                />
              </div>
            </div>
            <div className={classes["form-add_top"]}>
              <div className={classes["form-add_element"]}>
                <label>Description</label>
                <input
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="King size bed, 1 bathroom"
                />
              </div>
              <div className={classes["form-add_element"]}>
                <label>Max People</label>
                <input
                  type="number"
                  onChange={(e) => setMaxPeople(e.target.value)}
                  placeholder="3"
                />
              </div>

              <div className={classes["input-img"]}>
                <label>Choose a hotel</label>
                <select
                  style={{ width: "260px" }}
                  onChange={(e) => setChooseHotel(e.target.value)}
                >
                  {dataHotels.map((data) => {
                    return <option value={data._id}>{data.name}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
          <button className={classes["send-btn"]}>Send</button>
        </form>
      </main>
    </div>
  );
};

export default AddRoom;
