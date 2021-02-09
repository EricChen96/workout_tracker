const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    // CODE HERE
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "String is required"
            },
            name: {
                type: String,
                trim: true,
                required: "String is required"
            },
            duration: {
                type: Number,
            },
            weight: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            },
        }
    ]
});
// numExercises: "Exercises Performed",
// totalWeight: "Total Weight Lifted",
// totalSets: "Total Sets Performed",
// totalReps: "Total Reps Performed",
// totalDistance: "Total Distance Covered"
WorkoutSchema.virtual("totalDuration").get(function () {
    let result = 0;
    for (let i = 0; i < this.exercises.length; i++) {
        result += this.exercises[i].duration;
    }
    return result;
});

WorkoutSchema.virtual("numExercises").get(function () {
    return this.exercises.length;
});

WorkoutSchema.virtual("totalWeight").get(function () {
    let result = 0;
    for (let i = 0; i < this.exercises.length; i++) {
        result += this.exercises[i].weight;
    }
    return result;
});
WorkoutSchema.virtual("totalSets").get(function () {
    let result = 0;
    for (let i = 0; i < this.exercises.length; i++) {
        result += this.exercises[i].sets;
    }
    return result;
});
WorkoutSchema.virtual("totalReps").get(function () {
    let result = 0;
    for (let i = 0; i < this.exercises.length; i++) {
        result += this.exercises[i].reps;
    }
    return result;
});
WorkoutSchema.virtual("totalDistance").get(function () {
    let result = 0;
    for (let i = 0; i < this.exercises.length; i++) {
        result += this.exercises[i].distance;
    }
    return result;
});

WorkoutSchema.set('toJSON', { virtuals: true })

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;