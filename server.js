const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public", { extensions: "html" }));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );
  

//THIS WORKS
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } }, { new: true })
        .then(dbExercise => {
            res.json(dbExercise);
        })
        .catch(err => {
            res.json(err);
        });

    // db.Workout.create(body)
    //     .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercise: _id } }, { new: true }))
    //     .then(dbExercise => {
    //         res.json(dbExercise);
    //     })
    //     .catch(err => {
    //         res.json(err);
    //     });
});

app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            // if(dbWorkout.length <= 7) {
            //     res.json(dbWorkout);
            // }
            // else {
            //     res.json(dbWorkout.slice(dbWorkout.length-7));
            // }
            res.json(dbWorkout.slice(dbWorkout.length-7));
        })
})

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
