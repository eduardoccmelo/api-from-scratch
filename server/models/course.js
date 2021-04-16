const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: "Course name is required",
    },
    type: {
      type: String,
      required: "Course type is required",
    },
    location: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Course", CourseSchema);
