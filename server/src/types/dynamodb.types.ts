export type UploadStatus = "UPLOADED" | "PROCESSED" | "ALERTS_SENT" | "FAILED";

export type AlertMethod = "EMAIL" | "SMS";

export type AlertStatus = "PENDING" | "SENT" | "FAILED";

export type UploadedFileRecord = {
  pk: string;
  sk: "METADATA";
  entityType: "UPLOAD";
  fileId: string;
  fileName: string;
  s3Key: string;
  bucket: string;
  sheetName?: string;
  rawRowCount: number;
  filteredRowCount: number;
  status: UploadStatus;
  createdAt: string;
  updatedAt: string;
};

export type AlertRecipientRecord = {
  pk: string;
  sk: "METADATA";
  entityType: "RECIPIENT";
  recipientId: string;
  name: string;
  email?: string;
  phone?: string;
  facility?: string;
  notifyByEmail: boolean;
  notifyBySms: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AlertHistoryRecord = {
  pk: string;
  sk: string;
  entityType: "ALERT";
  alertId: string;
  fileId: string;
  recipientId: string;
  method: AlertMethod;
  message: string;
  status: AlertStatus;
  errorMessage?: string;
  sentAt?: string;
  createdAt: string;
};