const User = require("../models/user");

exports.loginUser = (req, res, next) => {
  User.find({ username: req.body.username })
    .then((user) => {
      if (user.length === 0) {
        return res.status(200).send("Username");
      }
      return user[0];
    })
    .then((user) => {
      if (user.password !== req.body.password) {
        return res.status(200).send("Password");
      }
      const data = {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        email: user.email,
      };
      return res.status(202).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addNewUser = (req, res, next) => {
  if (req.body.username === "") {
    res.send("Username is nothing!");
  } else {
    User.find({ username: req.body.username })
      .then((result) => {
        if (result.length > 0) {
          return res.send(false);
        } else {
          if (req.body.password.length < 8) {
            return res.send("Password is short");
          } else {
            const username = req.body.username;
            const password = req.body.password;
            const fullName = req.body.fullName;
            const phoneNumber = req.body.phoneNumber;
            const email = req.body.email;
            const isAdmin = req.body.isAdmin;
            const user = new User({
              username,
              password,
              fullName,
              phoneNumber,
              email,
              isAdmin,
            });
            user
              .save()
              .then(() => {
                console.log("Create New User Completed");
                return res.send(true);
              })
              .catch((err) => console.log(err));
          }
        }
      })
      .catch((err) => console.log(err));
  }
};
exports.getUser = (req, res, next) => {
  const userId = req.params._id;

  User.find({ _id: userId })
    .then((user) => {
      const data = {
        _id: user[0]._id,
        username: user[0].username,
        fullName: user[0].fullName,
        phoneNumber: user[0].phoneNumber,
        email: user[0].email,
      };
      return res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
