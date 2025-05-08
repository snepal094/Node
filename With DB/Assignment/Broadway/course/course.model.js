import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  name: String,
  duration: String,
  tutorName: String,
  price: Number,
  // name: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   maxLength: 55,
  // },

  /*
  duration: {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ["days", "weeks", "months", "years"],
      default: "months",
      required: true,
    },
    // required: true,
  },
*/

  // duration: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },

  // tutorName: {
  //   type: String,
  //   trim: true,
  //   maxLength: 55,
  // },

  // price: {
  //   type: Number,
  //   min: 0,
  //   required: true,
  // },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
