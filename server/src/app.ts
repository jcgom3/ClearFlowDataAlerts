import dotenv from "dotenv";
import express from "express";
import uploadsRouter from "./routes/uploads.routes.js";
import uploadRecordsRouter from "./routes/upload-records.routes.js";

dotenv.config();

const app = express();


app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "clearflow-data-alerts-api",
  });
});

app.use("/uploads", uploadsRouter);
app.use("/upload-records", uploadRecordsRouter);

export default app;