const express = require("express");

const {
  createWorkout,
  getAllWorkouts,
  deleteWorkout,
  getWorkout,
  updateWorkout,
} = require("../controllers/workoutcontoller");

const router = express.Router();

// get all workouts
router.get("/", getAllWorkouts);

// get a single workout
router.get("/:id", getWorkout);

// post a workout
router.post("/", createWorkout);

// delete a workout
router.delete("/:id", deleteWorkout);

// update a single workout
router.patch("/:id", updateWorkout);

// update all workouts
router.put("/", (req, res) => {
  res.json({ msg: "Update all workouts!" });
});

module.exports = router;
