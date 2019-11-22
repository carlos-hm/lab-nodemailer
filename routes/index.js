const express = require('express');
const router  = express.Router();

const {
  signupGet,
  signupPost
} = require("../controllers/auth.controller");

const {
  editStatus
} = require("../controllers/index.controller");


// SIGNUP
router.get("/signup", signupGet);
router.post("/signup", signupPost);

router.get("/confirm/:token", editStatus);

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
