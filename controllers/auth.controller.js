require("dotenv").config();

const User = require("../models/User");

const {
  transporter
} = require("../controllers/email");

exports.signupGet = (_, res) => res.render("auth/signup");

exports.signupPost = (req, res, next) => {
  const { username, email, password, passwordrepeat } = req.body;

  if(password !== passwordrepeat) {
    return res.render("auth/signup", {
      msg: "Password must be the same"
    });
  }

  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length )];
  }

  User.register({ username, email, token }, password)
    .then(user => {
      //EMAIL
       transporter.sendMail({
        from: "Carlos <carlosironjack@gmail.com>",
        to: email,
        subject: `Confirma tu correo ${username}`,
        html: `<a href="http://localhost:3000/confirm/${token}">Confirmar correo</a>`,
      });
      res.redirect("/login")
    })
    .catch(err => {
      if (err.username === "UserExistsError") {
        return res.render("auth/signup", {
          msg: "Already registered"
        });
      }
    });
};