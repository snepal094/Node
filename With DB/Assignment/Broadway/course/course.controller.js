import express from "express";
import Course from "./course.model.js";
import mongoose from "mongoose";
import { validateCourseData, addCourse } from "./course.service.js";

const router = express.Router();

//* add course
router.post("/add", /*validateCourseData,*/ addCourse);

export default router;
