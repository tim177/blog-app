const express = require("express");

// const {
//   register,
//   login,
//   forgotpassword,
//   resetpassword,
//   getPrivateData,
// } = require("../controllers/auth");
const {
  register,
  login,

  getPrivateData,
} = require("../controllers/auth");

const { getAccessToRoute } = require("../Middlewares/Authorization/auth");

const router = express.Router();

//✅
router.post("/register", register);

router.post("/login", login);

// router.post("/forgotpassword", forgotpassword);

// router.put("/resetpassword", resetpassword);

// ✅
router.get("/private", getAccessToRoute, getPrivateData);

module.exports = router;
