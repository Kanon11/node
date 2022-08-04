const { createUser, getUser, getUserbyEmail, login } = require("./user.controller");
const {checkToken } = require("../../auth/token_validation");
const router = require("express").Router();
router.post("/", checkToken,createUser);
router.get("/", checkToken,getUser);
router.get("/userbyemail", getUserbyEmail);
router.post("/login", login);
module.exports = router;