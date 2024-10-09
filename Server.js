const express = require("express");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

// express app - middleware
const app = express();
app.use(cors());
app.use(cookieParser()); //with this single line of code the entire backend is able to send and receive cookies
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// db connection
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    console.log(`Connected to DB`);
    app.listen(process.env.PORT, () => {
      console.log(`app listening at port`, process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
// routes
app.use("/api/workout", workoutRoutes);
app.use("/api/user", userRoutes);
