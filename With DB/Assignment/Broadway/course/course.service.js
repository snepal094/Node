import mongoose from "mongoose";
import Yup from "yup";
import Course from "./course.model.js";

export const validateCourseData = async (req, res, next) => {
  const courseValidationSchema = Yup.object({
    name: Yup.string().required().trim().max(55),

    // duration: Yup.object()
    //   .shape({
    //     value: Yup.number().required(),
    //     unit: Yup.string()
    //       .required("Duration unit is required")
    //       .oneOf(
    //         ["days", "weeks", "months", "years"],
    //         "Invalid duration unit."
    //       ),
    //   })
    //   .required(),

    duration: Yup.string().trim().required(),

    tutorName: Yup.string().trim().max(55),

    price: Yup.number().min(0).required(),
  });

  try {
    const validatedData = await courseValidationSchema.validate(req.body);
    req.body = validatedData;
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  next();
};

export const addCourse = async (req, res) => {
  const newCourse = req.body;
  await Course.create(newCourse);
  return res.status(201).send({ message: "Course added successfully." });
};
