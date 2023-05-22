import classes from "./BookingForm.module.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BookingForm = ({ state, hotelId, user }) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalRoom, setTotalRoom] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errorMess, setErrorMess] = useState();

  const totalPriceHandler = (bookRoom) => {
    const dateBooking = (date[0].endDate - date[0].startDate) / 86400000;

    const total = 0;

    const priceTotal = bookRoom.reduce((acc, cur) => {
      return acc + cur.price * cur.roomNumbers.length;
    }, total);

    const totalP = priceTotal * dateBooking;

    setTotalPrice(totalP);
  };

  const bookingRoomHandler = (roomCB, roomNumber) => {
    let bookRoom = [...totalRoom];

    const updatedRoomIndex = bookRoom.findIndex(
      (room) => room._id === roomCB._id
    );

    if (updatedRoomIndex >= 0) {
      let updatedRoomNumbers = bookRoom[updatedRoomIndex].roomNumbers;

      const isRoomNumber = bookRoom[updatedRoomIndex].roomNumbers.some(
        (num) => num === roomNumber
      );
      if (isRoomNumber) {
        updatedRoomNumbers = bookRoom[updatedRoomIndex].roomNumbers.filter(
          (r) => r !== roomNumber
        );
      } else {
        updatedRoomNumbers.push(roomNumber);
      }

      if (updatedRoomNumbers.length !== 0) {
        bookRoom[updatedRoomIndex] = {
          ...bookRoom[updatedRoomIndex],
          roomNumbers: updatedRoomNumbers,
        };
      } else {
        bookRoom = bookRoom.filter((booking) => booking._id !== roomCB._id);
      }
    } else {
      bookRoom.push({
        _id: roomCB._id,
        price: roomCB.price,
        roomNumbers: [roomNumber],
      });
    }
    totalPriceHandler(bookRoom);

    setTotalRoom(bookRoom);
  };

  useEffect(() => {
    totalPriceHandler(totalRoom);
  }, [date]);

  const reserveHandler = () => {
    const d = new Date();

    const status =
      d < date[0].startDate
        ? "Booked"
        : d > date[0].endDate
        ? "Checkout"
        : "Checkin";

    const rooms = [];
    const roomId = [];
    totalRoom.map((hotel) => {
      hotel.roomNumbers.map((num) => {
        rooms.push(num);
      });
    });
    totalRoom.map((hotel) => {
      roomId.push(hotel._id);
    });
    if (paymentMethod === "") {
      setErrorMess("Select Payment Method");
    } else if (totalRoom.length === 0) {
      setErrorMess("Select Rooms");
    } else if (date[0].startDate === date[0].endDate) {
      setErrorMess("Select Date Book");
    } else {
      const data = {
        user: user.username,
        hotel: hotelId,
        room: rooms,
        dateStart: date[0].startDate,
        endDate: date[0].endDate,
        price: totalPrice,
        payment: paymentMethod,
        status: status,
        roomId: roomId,
      };
      axios
        .post("http://localhost:5000/transaction", { data: data })
        .then()
        .catch((err) => console.log(err));
      navigate("/transaction");
      setErrorMess();
    }
  };

  return (
    <div className={classes["form-container"]}>
      <div className={classes["form-main"]}>
        <div className={classes["form-date"]}>
          <h2>Dates</h2>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={new Date()}
          />
        </div>
        <div className={classes["form-reserve"]}>
          <h2>Reserve Info</h2>
          <form className={classes["form-user"]}>
            <label htmlFor="name">Your Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              defaultValue={user.fullName}
            />
            <label htmlFor="email">Your Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              defaultValue={user.email}
            />
            <label htmlFor="phone">Your Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              defaultValue={`+84 ${user.phoneNumber}`}
            />
            <label htmlFor="card">Your Identity Card Number</label>
            <input
              type="number"
              id="card"
              name="card"
              placeholder="Card Number"
            />
          </form>
        </div>
      </div>
      <div className={classes["select-room"]}>
        <h2>Select Rooms</h2>
        <div className={classes["room-detail_container"]}>
          {state.map((room) => {
            return (
              <div key={room._id} className={classes["room-detail"]}>
                <div>
                  <h3 className={classes["room-detail_title"]}>{room.title}</h3>
                  <p className={classes["room-detail_desc"]}>{room.desc}</p>
                  <p className={classes["room-detail_maxpeople"]}>
                    Max people: <strong>{room.maxPeople}</strong>
                  </p>
                  <p className={classes["room-detail_price"]}>${room.price}</p>
                </div>
                <form className={classes.roomNumber}>
                  {room.roomNumbers.map((num) => {
                    return (
                      <div key={num} className={classes["room-number"]}>
                        <label htmlFor={num}>{num}</label>
                        <input
                          type="checkbox"
                          name={num}
                          id={num}
                          value={num}
                          onChange={() => {
                            bookingRoomHandler(room, num);
                          }}
                        />
                      </div>
                    );
                  })}
                </form>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes["total-bill"]}>
        <h2>Total Bill: ${totalPrice}</h2>
        <div>
          <select
            onChange={(e) => setPaymentMethod(e.target.value)}
            className={classes["payment-method"]}
          >
            <option value="">Select Payment Method</option>
            <option value="credir card">Credit Card</option>
            <option value="cash">Cash</option>
          </select>
          <button className={classes["reserve-btn"]} onClick={reserveHandler}>
            Reserve Now
          </button>
        </div>
        {errorMess && <p className={classes["error-message"]}>{errorMess}</p>}
      </div>
    </div>
  );
};
export default BookingForm;
