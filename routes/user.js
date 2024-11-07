const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
   createUser,
   getUsers,
   getUser,
   updateUser,
   deleteUser,
   register,
   login,
   changePassword,
} = require("../controller/user");
const router = express.Router();

router.route("/").get(getUsers).post(createUser);

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/changePassword").put(changePassword);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
