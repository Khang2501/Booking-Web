import classes from "./AddHotel.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";

import { useNavigate } from "react-router-dom";

const AddHotel = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [distance, setDistance] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [featured, setFeatured] = useState();
  const [room, setRoom] = useState([]);
  const [dataFea, setDataFea] = useState([]);

  const [toggleWarning, setToggleWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/room/all")
      .then((result) => {
        const arr = result.data.map((res) => {
          return {
            _id: res._id,
            title: res.title,
          };
        });
        setDataFea(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const roomHandler = (id) => {
    const arrRoom = room;
    const isExistence = arrRoom.some((arr) => arr === id);
    let updateRooms = arrRoom;
    if (isExistence) {
      updateRooms = arrRoom.filter((arr) => arr !== id);
    } else {
      updateRooms.push(id);
    }
    setRoom(updateRooms);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      city === "" ||
      distance === "" ||
      description === "" ||
      image === "" ||
      type === "" ||
      address === "" ||
      title === "" ||
      price <= 0 ||
      room.length === 0
    ) {
      setToggleWarning(true);
    } else {
      axios
        .post("/admin/add-new-hotel", {
          name: name,
          type: type,
          city: city,
          address: address,
          distance: distance,
          photos: image.split(","),
          desc: description,
          rating: 4,
          featured: featured === "true",
          rooms: room,
          cheapestPrice: price,
        })
        .then((result) => {
          if (result.data) setSuccess(true);
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
              navigate("/hotels");
            }}
          >
            Add hotel success
          </Alert>
        </Stack>
      )}
      <div className={classes["add-title"]}>Add New Hotel</div>
      <main className={classes["add-main"]}>
        <form onSubmit={submitHandler} className={classes["form-add"]}>
          <div>
            <div className={classes["form-add_top"]}>
              <div className={classes["form-add_element"]}>
                <label>Name</label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My Hotel"
                />
              </div>
              <div className={classes["form-add_element"]}>
                <label>City</label>
                <input
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ha Noi"
                />
              </div>
              <div className={classes["form-add_element"]}>
                <label>Distance from city center</label>
                <input
                  type="text"
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="500"
                />
              </div>
              <div className={classes["form-add_element"]}>
                <label>Description</label>
                <input
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
              </div>
              <div className={classes["input-img"]}>
                <label>Images</label>
                <input
                  type="text"
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="End of link by comma"
                />
              </div>
            </div>
            <div className={classes["form-add_top"]}>
              <div className={classes["form-add_element"]}>
                <label>Type</label>
                <input
                  type="text"
                  onChange={(e) => setType(e.target.value)}
                  placeholder="My Hotel"
                />
              </div>
              <div className={classes["form-add_element"]}>
                <label>Address</label>
                <input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ha Noi"
                />
              </div>
              <div className={classes["form-add_element"]}>
                <label>Title</label>
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="the best hotel"
                />
              </div>
              <div className={classes["form-add_element"]}>
                <label>Price</label>
                <input
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="100"
                />
              </div>
              <div className={classes["input-img"]}>
                <label>Featured</label>
                <select onChange={(e) => setFeatured(e.target.value)}>
                  <option value="false">no</option>
                  <option value="true">yes</option>
                </select>
              </div>
            </div>
          </div>
          <div className={classes["form-add_bot"]}>
            <label>Rooms</label>
            <div className={classes["main-bot"]}>
              {dataFea.map((fea) => {
                return (
                  <label key={fea._id}>
                    <input
                      type="checkbox"
                      onChange={() => {
                        roomHandler(fea._id);
                      }}
                    />
                    {fea.title}
                  </label>
                );
              })}
            </div>
          </div>
          <button className={classes["send-btn"]}>Send</button>
        </form>
      </main>
    </div>
  );
};

export default AddHotel;
