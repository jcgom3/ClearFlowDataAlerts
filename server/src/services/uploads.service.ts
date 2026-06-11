import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "node:crypto";
import { dynamoDocumentClient } from "../lib/dynamodb.js";
import type { UploadedFileRecord } from "../types/dynamodb.types.js";

const tableName = process.env.AWS_DYNAMODB_TABLE;

if (!tableName) {
  throw new Error("AWS_DYNAMODB_TABLE is not configured in server/.env");
}

export type CreateUploadRecordInput = {
  fileName: string;
  s3Key: string;
  bucket: string;
  sheetName?: string | undefined;
  rawRowCount: number;
  filteredRowCount: number;
};

export async function createUploadRecord(
  input: CreateUploadRecordInput
): Promise<UploadedFileRecord> {
  const fileId = randomUUID();
  const now = new Date().toISOString();

  const baseItem = {
    pk: `UPLOAD#${fileId}`,
    sk: "METADATA",
    entityType: "UPLOAD",
    fileId,
    fileName: input.fileName,
    s3Key: input.s3Key,
    bucket: input.bucket,
    rawRowCount: input.rawRowCount,
    filteredRowCount: input.filteredRowCount,
    status: "UPLOADED",
    createdAt: now,
    updatedAt: now,
  } satisfies Omit<UploadedFileRecord, "sheetName">;

  const item: UploadedFileRecord = input.sheetName
    ? {
        ...baseItem,
        sheetName: input.sheetName,
      }
    : baseItem;

  await dynamoDocumentClient.send(
    new PutCommand({
      TableName: tableName,
      Item: item,
    })
  );

  return item;
}