const workout = require("../models/workoutsmodel");
const mongoose = require("mongoose");

// get all workout
const getAllWorkouts = async (req, res) => {
  const allWorkouts = await workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(allWorkouts);
};

// create a workout

const createWorkout = async (req, res) => {
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
};

// delete a workout

const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    // validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: "Invalid ID" });
    }

    const deletedWorkout = await workout.findByIdAndDelete(id);

    res.status(200).json(deletedWorkout);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Invalid ID" });
  }
  const Workout = await workout.findById(id);

  // validation
  if (!workout) {
    return res.status(400).json({ msg: "No such workout" });
  }

  res.status(200).json(Workout);
};

// update a workout

const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    // validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: "Invalid ID" });
    }

    const updatedWorkout = await workout.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!workout) {
      return res.status(400).json({ msg: "No such workout" });
    }

    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
