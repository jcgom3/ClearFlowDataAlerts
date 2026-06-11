// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import uploadsRouter from "./routes/uploads.routes.js";
// import uploadRecordsRouter from "./routes/upload-records.routes.js";

// dotenv.config();

// const app = express();

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://clearflow-data-alerts.vercel.app",
//     ],
//   })
// );

// app.use(express.json());

// app.get("/health", (_req, res) => {
//   res.json({
//     status: "ok",
//     service: "clearflow-data-alerts-api",
//   });
// });

// app.use("/uploads", uploadsRouter);
// app.use("/upload-records", uploadRecordsRouter);

// const port = Number(process.env.PORT ?? 4000);

// app.listen(port, () => {
//   console.log(`API running on http://localhost:${port}`);
// });


import "dotenv/config";
import app from "./app.js";

const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});