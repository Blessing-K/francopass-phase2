import express from "express";
import {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/resource.controller.js";
import validate from "../../../shared/middlewares/validate.js";
import { createResourceRules, updateResourceRules } from "../middlewares/validation.js";

const router = express.Router();

router.get("/", getResources);
router.get("/:id", getResourceById);
router.post("/", createResourceRules, validate, createResource);
router.put("/:id", updateResourceRules, validate, updateResource);
router.delete("/:id", deleteResource);

export default router;
