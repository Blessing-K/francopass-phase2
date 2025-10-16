import express from "express";
import morgan from "morgan";
import cors from "cors";

// Routers
import usersRouter from "./modules/users/routes/users.routes.js";
import examsRouter from "./modules/exams/routes/exams.routes.js";
import vocabRouter from "./modules/vocab/routes/vocab.routes.js";
import feedbackRouter from "./modules/feedback/routes/feedback.routes.js";
import resourcesRouter from "./modules/resources/routes/resources.routes.js";

const app = express();

// === Application-level Middlewares ===
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Health check
app.get("/", (req, res) =>
  res.json({ ok: true, service: "FrancoPass API", version: "0.2.0" })
);

// === Feature Routers (independent) ===
app.use("/api/users", usersRouter);
app.use("/api/exams", examsRouter);
app.use("/api/vocab", vocabRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/resources", resourcesRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found", path: req.originalUrl });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("[ERROR]", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// === Start Server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`FrancoPass API listening on http://localhost:${PORT}`);
});
