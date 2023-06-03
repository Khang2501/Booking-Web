const User = require("../models/user");
const Transaction = require("../models/transaction");
const Room = require("../models/room");
const Hotel = require("../models/hotel");
const mongoose = require("mongoose");
exports.getInforBoard = (req, res, next) => {
  const inforBoard = {};

  Transaction.find()
    .then((result) => {
      const orderLength = result.length;
      inforBoard.orders = orderLength;
      return result;
    })
    .then((trans) => {
      const total = 0;
      const totalPrice = trans.reduce((acc, curr) => {
        return acc + curr.price;
      }, total);
      inforBoard.totalPrice = totalPrice;
      return totalPrice;
    })
    .then((trans) => {
      const dateEstablish = new Date("2023-04-01");
      const dateCurr = new Date();

      const month = (dateCurr - dateEstablish) / 2678400000;
      const balance = Math.floor(trans / Math.ceil(month));
      inforBoard.balance = balance;
    })
    .then(() => {
      User.find()
        .then((result) => {
          const userLength = result.length;
          inforBoard.users = userLength;
        })
        .then(() => {
          res.send(inforBoard);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
exports.getHotels = (req, res, next) => {
  const id = req.params._id;
  const _id = id === "all" ? {} : { _id: id };
  Hotel.find(_id)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

exports.deletedHotel = (req, res, next) => {
  const hotelId = req.params.hotelId;
  Transaction.find()
    .then((result) => {
      const isUsed = result.some((trans) => trans.hotel.toString() === hotelId);
      if (isUsed) {
        return res.send({ status: false });
      } else {
        Hotel.deleteOne({ _id: hotelId })
          .then(() => res.send({ status: true }))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};
exports.getRooms = (req, res, next) => {
  const reqId = req.params._id === "all" ? {} : { _id: req.params._id };
  Room.find(reqId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.addNewHotel = (req, res, next) => {
  const newHotel = req.body.newHotel;

  const hotel = new Hotel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    type: req.body.type,
    city: req.body.city,
    address: req.body.address,
    distance: req.body.distance,
    photos: req.body.photos,
    desc: req.body.desc,
    rating: req.body.rating,
    featured: req.body.featured,
    rooms: req.body.rooms,
    cheapestPrice: req.body.cheapestPrice,
  });
  hotel.save();
};
exports.deletedRoom = (req, res, next) => {
  const roomId = req.params.roomId;
  Transaction.find()
    .then((result) => {
      let arrId = [];
      result.map((trans) => {
        arrId = arrId.concat(trans.roomId);
      });

      return arrId;
    })
    .then((arrId) => {
      const isUsed = arrId.some((id) => id.toString() === roomId);
      console.log(isUsed);

      if (isUsed) {
        return res.send({ status: false });
      } else {
        Room.deleteOne({ _id: roomId })
          .then(() => res.send({ status: true }))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};
exports.addNewRoom = (req, res, next) => {
  const room = new Room({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    price: req.body.price,
    maxPeople: req.body.maxPeople,
    desc: req.body.desc,
    roomNumbers: req.body.roomNumbers,
  });
  room.save();
};
exports.loginAdmin = (req, res, next) => {
  User.find({
    username: req.body.username,
    password: req.body.password,
    isAdmin: true,
  })
    .then((user) => {
      if (user.length === 0) {
        return res.send(false);
      } else {
        return res.send(user[0]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateHotel = (req, res, next) => {
  const _id = req.params.id;

  Hotel.findById(_id)
    .then((hotel) => {
      hotel.name = req.body.name;
      hotel.type = req.body.type;
      hotel.city = req.body.city;
      hotel.address = req.body.address;
      hotel.distance = req.body.distance;
      hotel.photos = req.body.photos;
      hotel.desc = req.body.desc;
      hotel.rating = req.body.rating;
      hotel.featured = req.body.featured;
      hotel.rooms = req.body.rooms;
      hotel.cheapestPrice = req.body.cheapestPrice;
      return hotel.save();
    })
    .then(() => {
      console.log("COMPLTED");
      res.send("COMPLTED");
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.updateRoom = (req, res, next) => {
  const _id = req.params.id;

  Room.findById(_id)
    .then((room) => {
      room.title = req.body.title;
      room.price = req.body.price;
      room.maxPeople = req.body.maxPeople;
      room.desc = req.body.desc;
      room.distance = req.body.distance;
      room.roomNumbers = req.body.roomNumbers;

      return room.save();
    })
    .then(() => {
      console.log("COMPLTED");
      res.send("COMPLTED");
    })
    .catch((err) => {
      res.send(err);
    });
};
