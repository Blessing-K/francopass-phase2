import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import validate from "../../../shared/middlewares/validate.js";
import { createUserRules, updateUserRules } from "../middlewares/validation.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUserRules, validate, createUser);
router.put("/:id", updateUserRules, validate, updateUser);
router.delete("/:id", deleteUser);

export default router;
