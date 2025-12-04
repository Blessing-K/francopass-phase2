import express from "express";
import {
  getFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedback.controller.js";
import validate from "../../../shared/middlewares/validate.js";
import {
  createFeedbackRules,
  updateFeedbackRules,
} from "../middlewares/validation.js";

const router = express.Router();

router.get("/", getFeedback);
router.get("/:id", getFeedbackById);
router.post("/", createFeedbackRules, validate, createFeedback);
router.put("/:id", updateFeedbackRules, validate, updateFeedback);
router.delete("/:id", deleteFeedback);

export default router;
