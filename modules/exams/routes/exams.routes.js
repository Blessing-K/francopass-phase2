import express from "express";
import {
  getExams,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
} from "../controllers/exam.controller.js";
import validate from "../../../shared/middlewares/validate.js";
import { createExamRules, updateExamRules } from "../middlewares/validation.js";

const router = express.Router();

router.get("/", getExams);
router.get("/:id", getExamById);
router.post("/", createExamRules, validate, createExam);
router.put("/:id", updateExamRules, validate, updateExam);
router.delete("/:id", deleteExam);

export default router;
