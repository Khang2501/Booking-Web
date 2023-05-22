const User = require("../models/user");

exports.loginUser = (req, res, next) => {
  User.find({ username: req.body.username, password: req.body.password })
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
