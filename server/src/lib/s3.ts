import "dotenv/config";
import { S3Client } from "@aws-sdk/client-s3";

const awsRegion = process.env.AWS_REGION ?? process.env.AWS_REGION_NAME;

if (!awsRegion) {
  throw new Error("AWS_REGION is not configured in server/.env");
}

export const s3Client = new S3Client({
  region: awsRegion,
});