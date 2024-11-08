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

// api/v1/users
router
   .route("/")
   .get(protect, authorize("member", "admin"), getUsers)
   .post(protect, authorize("admin"), createUser);
// api/v1/users/register
router.route("/register").post(register);

// api/v1/users/login
router.route("/login").post(login);

// api/v1/users/changePassword
router.route("/changePassword").put(protect, changePassword);

// api/v1/users/:id
router
   .route("/:id")
   .get(protect, authorize("member", "admin"), getUser)
   .put(protect, authorize("member", "admin"), updateUser)
   .delete(protect, authorize("admin", "member"), deleteUser);

module.exports = router;
