import mongoose from "mongoose";

// Mongoose Schema and Model (for future use)
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscription: { type: String, enum: ["free", "premium"], default: "free" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
