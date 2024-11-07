const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const myError = require("./utils/myError");
const usersRoutes = require("./routes/users");
dotenv.config({ path: "./config/config.env" });

mongoose
   .connect(process.env.MONGODB)
   .then(() => console.log("Амжилтай өгөгдлийн санд холбогдлоо."))
   .catch((error) =>
      console.error("Өгөгдлийн сантай холбогдоход алдаа гарлаа: ", error),
   );

const app = express();
app.use(express.json());
app.use("/api/v1/users", usersRoutes);

const server = app.listen(
   process.env.PORT,
   console.log("Express server " + process.env.PORT + " port deer aslaa.."),
);

process.on(`unhandledRejection`, (err, promise) => {
   console.log(`Error : ${err.message}`);
   server.close(() => {
      process.exit(1);
   });
});
