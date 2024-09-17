const express = require("express");

const workout = require("../models/workoutsmodel");

const router = express.Router();

// get all workouts
router.get("/", (req, res) => {
  res.json({ msg: "GET all workouts!" });
});

// get a single workout
router.get("/:id", (req, res) => {
  res.json({ msg: "GET a single workouts!" });
});

// post a workout
router.post("/", async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    //   validation
    if (!title || !reps || !load) {
      return res.status(400).json({ msg: "Not found" });
    }

    const createdWorkout = await workout.create({
      title,
      reps,
      load,
    });
    res.status(200).json(createdWorkout);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error" });
  }
});

// delete a workout
router.delete("/:id", (req, res) => {
  res.json({ msg: "DELETE a  single workouts!" });
});

// update a single workout
router.patch("/:id", (req, res) => {
  res.json({ msg: "update a single workouts!" });
});

// update all workouts
router.put("/", (req, res) => {
  res.json({ msg: "Update all workouts!" });
});

module.exports = router;
