import { S3Client } from "@aws-sdk/client-s3";

const awsRegion = process.env.AWS_REGION ?? process.env.AWS_REGION_NAME;

if (!awsRegion) {
  throw new Error("AWS region is not configured.");
}

export const s3Client = new S3Client({
  region: awsRegion,
});