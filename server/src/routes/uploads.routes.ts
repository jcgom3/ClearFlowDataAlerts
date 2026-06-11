import { Router } from "express";
import { z } from "zod";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../lib/s3.js";

const router = Router();

const createUploadUrlSchema = z.object({
  fileName: z.string().min(1),
  contentType: z.string().min(1),
});

router.post("/presigned-url", async (req, res) => {
  const result = createUploadUrlSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid request body",
      issues: result.error.flatten(),
    });
  }

  const { fileName, contentType } = result.data;

  const bucket = process.env.AWS_S3_BUCKET;

  if (!bucket) {
    return res.status(500).json({
      error: "AWS_S3_BUCKET is not configured.",
    });
  }

  const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `uploads/${Date.now()}-${cleanFileName}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 5,
  });

  return res.json({
    uploadUrl,
    key,
    bucket,
  });
});

export default router;