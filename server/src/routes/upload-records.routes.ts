import { Router } from "express";
import { z } from "zod";
import { createUploadRecord } from "../services/uploads.service.js";

const router = Router();

const createUploadRecordSchema = z.object({
  fileName: z.string().min(1),
  s3Key: z.string().min(1),
  bucket: z.string().min(1),
  sheetName: z.string().optional(),
  rawRowCount: z.number().int().nonnegative(),
  filteredRowCount: z.number().int().nonnegative(),
});

router.post("/", async (req, res) => {
  const result = createUploadRecordSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid upload record payload",
      issues: result.error.flatten(),
    });
  }

  try {
    const uploadRecord = await createUploadRecord(result.data);

    return res.status(201).json(uploadRecord);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to save upload record.",
    });
  }
});

export default router;