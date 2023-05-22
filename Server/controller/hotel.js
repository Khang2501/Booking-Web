const Hotel = require("../models/hotel");
const Room = require("../models/room");

exports.getHotel = (req, res, next) => {
  const filterHandler = (array, cb) => {
    return array.filter(cb).length;
  };
  Hotel.find()
    .then((result) => {
      const hotel = {
        area: {
          HaNoi: filterHandler(result, (i) => i.city === "Ha Noi"),
          HoChiMinh: filterHandler(result, (i) => i.city === "Ho Chi Minh"),
          DaNang: filterHandler(result, (i) => i.city === "Da Nang"),
        },
        type: {
          hotel: filterHandler(result, (i) => i.type === "hotel"),
          apartment: filterHandler(result, (i) => i.type === "apartment"),
          resort: filterHandler(result, (i) => i.type === "resort"),
          villa: filterHandler(result, (i) => i.type === "villa"),
          cabin: filterHandler(result, (i) => i.type === "cabin"),
        },
        rating: result.sort((a, b) => b.rating - a.rating),
      };
      res.send(hotel);
    })
    .catch((err) => console.log(err));
};

exports.getHotelById = (req, res) => {
  const hotelId = req.params.id;

  Hotel.findById(hotelId)
    .populate("rooms")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

exports.getRoom = (req, res, next) => {
  const location = req.query.location.toLowerCase();
  const people = req.query.peo;
  const roomQuantity = Number(req.query.room);

  Hotel.find()
    .populate("rooms")
    .then((result) => {
      const hotel = result.filter(
        (hot) =>
          hot.city.toLowerCase().includes(location) ||
          hot.address.toLowerCase().includes(location)
      );
      return hotel;
    })
    .then((result) => {
      const hotel = result;
      //1. filter hotel by max people
      const maxPeopleFilter = hotel
        .map((peo) => {
          return {
            ...peo._doc,
            rooms: peo._doc.rooms.filter(
              (maxPeo) => maxPeo.maxPeople >= people
            ),
          };
        })
        .filter((hotel) => hotel.rooms.length !== 0);
      //2. filter hotel by number of room
      const roomFilter = maxPeopleFilter
        .map((room) => {
          return {
            ...room,
            rooms: room.rooms.filter(
              (r) => r.roomNumbers.length >= roomQuantity
            ),
          };
        })
        .filter((room) => room.rooms.length !== 0);

      res.send(roomFilter);
    })
    .catch((err) => {
      console.log(err);
    });
};
