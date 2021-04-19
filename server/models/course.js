const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Course Name is required"],
    },
    type: {
      type: String,
      required: [true, "Course Type is required"],
    },
    location: { type: String, default: "Remote" },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Course", CourseSchema);
