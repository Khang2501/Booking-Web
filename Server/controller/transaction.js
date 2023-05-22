const Transaction = require("../models/transaction");

exports.postAddTransaction = (req, res, next) => {
  const data = req.body.data;

  const transaction = new Transaction({
    user: data.user,
    hotel: data.hotel,
    room: data.room,
    dateStart: data.dateStart,
    dateEnd: data.endDate,
    price: data.price,
    payment: data.payment,
    status: data.status,
    roomId: data.roomId,
  });
  transaction
    .save()
    .then((result) => {
      res.send("Completed");
    })
    .catch((err) => res.send(err));
};

exports.getTransaction = (req, res, next) => {
  const username = req.params.username;
  let name = username === "all" ? {} : { user: username };
  const formatDate = (text) => {
    const date = text.slice(8, 10);
    const month = text.slice(5, 7);
    const year = text.slice(0, 4);
    return date + "/" + month + "/" + year;
  };

  const createStatus = (start, end) => {
    const date = new Date();
    const dStart = new Date(start);
    const dEnd = new Date(end);

    return date < dStart ? "Booked" : date > dEnd ? "Checkout" : "Checkin";
  };

  Transaction.find(name)
    .populate("hotel")
    .then((result) => {
      const data = result.map((d) => ({
        rooms: d.room,
        _id: d._id,
        username: d.user,
        hotel: {
          _id: d.hotel._id,
          name: d.hotel.name,
        },
        dateStart: formatDate(d.dateStart),
        dateEnd: formatDate(d.dateEnd),
        payment: d.payment,
        price: d.price,
        status: createStatus(d.dateStart, d.dateEnd),
      }));
      return data;
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};
