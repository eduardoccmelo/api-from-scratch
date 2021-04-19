const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Course = require("./models/course");
const Student = require("./models/student");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("The server is ON!");
});

app.get("/courses", (req, res) => {
  Course.find()
    .then((allCourses) => {
      console.log(allCourses);
      res.status(200);
      res.json(allCourses);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/students", (req, res) => {
  Student.find()
    .then((allStudents) => {
      console.log(allStudents);
      res.status(200);
      res.json(allStudents);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/courses/:courseId", (req, res) => {
  Course.findById(req.params.courseId).then((course) => {
    if (course) {
      console.log(course);
      res.status(200);
      res.json(course);
    } else {
      console.log("Course Not Found");
      res.status(404);
      res.json("Course Not Found");
    }
  });
});

app.get("/courses/:courseId/students", (req, res) => {
  const { courseId } = req.params;
  Student.find({ course: courseId })
    .then((student) => {
      console.log(student);
      res.status(200);
      res.json(student);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/courses/:courseId/students/:studentId", (req, res) => {
  const { courseId, studentId } = req.params;
  Student.findOne({ course: courseId, _id: studentId })
    .then((student) => {
      if (student) {
        console.log(student);
        res.status(200);
        res.json(student);
      } else {
        console.log("This student is not in this course");
        res.json("This student is not in this course");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/courses", (req, res) => {
  Course.create(req.body)
    .then((newCourse) => {
      if (newCourse.location === undefined) {
        newCourse.location = "Remote";
      }
      console.log(newCourse);
      res.status(201);
      res.json(newCourse);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/courses/:courseId/students", (req, res) => {
  Student.create(req.body)
    .then((newStudent) => {
      console.log(newStudent);
      res.status(201);
      res.json(newStudent);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.patch("/courses/:courseId", (req, res) => {
  Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true }).then(
    (updatedCourse) => {
      if (updatedCourse) {
        console.log(updatedCourse);
        res.status(200);
        res.json(updatedCourse);
      } else {
        console.log("Course Not Found");
        res.status(404);
      }
    }
  );
});

app.patch("/students/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true }).then(
    (updatedStudent) => {
      if (updatedStudent) {
        console.log(updatedStudent);
        res.status(200);
        res.json(updatedStudent);
      } else {
        console.log("Student Not Found");
        res.status(404);
      }
    }
  );
});

app.delete("/courses/:courseId", (req, res) => {
  Course.findByIdAndDelete(req.params.courseId)
    .then((course) => {
      console.log("Course Deleted");
      res.status(200);
      res.json(course);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.delete("/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then((student) => {
      console.log("Student Deleted");
      res.status(200);
      res.json(student);
    })
    .catch((error) => {
      console.log(error);
    });
});

mongoose.connect("mongodb://localhost/courses-students", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongodb = mongoose.connection;

mongodb.on("open", () => {
  app.listen(4000, () => {
    console.log("Listening on http://localhost:4000");
  });
});
