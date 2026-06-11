const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not configured.");
}

export async function createPresignedUploadUrl(input: {
  fileName: string;
  contentType: string;
}) {
  const response = await fetch(`${API_BASE_URL}/uploads/presigned-url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Unable to create S3 upload URL.");
  }

  return response.json() as Promise<{
    uploadUrl: string;
    key: string;
    bucket: string;
  }>;
}

export async function uploadFileToS3(input: {
  file: File;
  uploadUrl: string;
}) {
  const response = await fetch(input.uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": input.file.type,
    },
    body: input.file,
  });

  if (!response.ok) {
    throw new Error("Unable to upload file to S3.");
  }
}


export async function saveUploadRecord(input: {
  fileName: string;
  s3Key: string;
  bucket: string;
  sheetName?: string;
  rawRowCount: number;
  filteredRowCount: number;
}) {
  const response = await fetch(`${API_BASE_URL}/upload-records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Unable to save upload record.");
  }

  return response.json();
}