const express = require("express");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");

require("dotenv").config();

// express app - middleware
const app = express();

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
