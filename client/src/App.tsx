import { useState, useEffect } from "react";
import { FileUploadPanel } from "./components/upload/FileUploadPanel";
import { FilteredRowsTable } from "./components/tables/FilteredRowsTable";
import type { SpreadsheetRow } from "./types/excel.types";
import {
  createPresignedUploadUrl,
  uploadFileToS3,
  saveUploadRecord,
  getLatestUpload,
} from "./lib/api";
import { getRowsDateRange } from "./features/excel/getDateRanges";
import { RowDetailsModal } from "./components/modals/RowDetailsModal";
import { parseExcelBlob } from "./features/excel/parseExcelFile";
import { filterRows } from "./features/excel/filterRows";

type UploadedFileState = {
  file: File;
  fileName: string;
  sheetName: string;
  rawRows: SpreadsheetRow[];
  filteredRows: SpreadsheetRow[];
};

function App() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFileState | null>(null);
  const [s3UploadStatus, setS3UploadStatus] = useState<string | null>(null);
  const [activeResultsTab, setActiveResultsTab] = useState<"filtered" | "raw">(
    "filtered"
  );
  
  const [latestUploadStatus, setLatestUploadStatus] = useState<string | null>(
  null
);

  const [selectedRow, setSelectedRow] = useState<SpreadsheetRow | null>(null);




  useEffect(() => {
  async function loadLatestUpload() {
    setLatestUploadStatus("Loading latest uploaded file...");

    try {
      const latestUpload = await getLatestUpload();

      if (!latestUpload) {
        setLatestUploadStatus(null);
        return;
      }

      const fileResponse = await fetch(latestUpload.downloadUrl);

      if (!fileResponse.ok) {
        throw new Error("Unable to download latest uploaded file from S3.");
      }

      const blob = await fileResponse.blob();

      const parsed = await parseExcelBlob(blob, latestUpload.upload.fileName);
      const filteredRows = filterRows(parsed.rows);

      const restoredFile = new File([blob], latestUpload.upload.fileName, {
        type:
          blob.type ||
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      setUploadedFile({
        file: restoredFile,
        fileName: parsed.fileName,
        sheetName: latestUpload.upload.sheetName ?? parsed.sheetName,
        rawRows: parsed.rows,
        filteredRows,
      });

      setActiveResultsTab("filtered");
      setSelectedRow(null);
      setLatestUploadStatus(
        `Loaded latest upload: ${latestUpload.upload.fileName}`
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to load latest upload.";

      setLatestUploadStatus(message);
    }
  }

  loadLatestUpload();
}, []);

  async function handleSaveFileToS3() {
    if (!uploadedFile) return;

    setS3UploadStatus("Creating secure upload URL...");

    try {
      const { uploadUrl, key, bucket } = await createPresignedUploadUrl({
        fileName: uploadedFile.file.name,
        contentType:
          uploadedFile.file.type ||
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      setS3UploadStatus("Uploading file to S3...");

      await uploadFileToS3({
        file: uploadedFile.file,
        uploadUrl,
      });

      setS3UploadStatus("Saving upload record...");

      await saveUploadRecord({
        fileName: uploadedFile.fileName,
        s3Key: key,
        bucket,
        sheetName: uploadedFile.sheetName,
        rawRowCount: uploadedFile.rawRows.length,
        filteredRowCount: uploadedFile.filteredRows.length,
      });

      setS3UploadStatus(`File uploaded and saved successfully. S3 key: ${key}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "File upload failed.";

      setS3UploadStatus(message);
    }
  }

  const rawDateRange = uploadedFile
    ? getRowsDateRange(uploadedFile.rawRows)
    : null;

  const filteredDateRange = uploadedFile
    ? getRowsDateRange(uploadedFile.filteredRows)
    : null;

  const activeRows =
    activeResultsTab === "filtered"
      ? uploadedFile?.filteredRows ?? []
      : uploadedFile?.rawRows ?? [];

  const activeTitle =
    activeResultsTab === "filtered"
      ? 'Rows containing "frame"'
      : "Raw Results";

  const activeSubtitle =
    activeResultsTab === "filtered"
      ? `Showing ${uploadedFile?.filteredRows.length ?? 0} matching rows across ${uploadedFile?.filteredRows[0]
        ? Object.keys(uploadedFile.filteredRows[0]).length
        : 0
      } columns.`
      : `Showing ${uploadedFile?.rawRows.length ?? 0} total rows across ${uploadedFile?.rawRows[0] ? Object.keys(uploadedFile.rawRows[0]).length : 0
      } columns.`;


  return (
  <main className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-slate-100">
    <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 w-full rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800 p-5 shadow-xl sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            ClearFlow
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Data Alerts Console
          </h1>

          <p className="mt-2 max-w-3xl text-slate-400">
            Upload Excel files, filter production data, review results, and send
            controlled alerts to the right users.
          </p>
        </div>

        <div className="grid min-w-0 gap-6">
          <FileUploadPanel
            onRowsParsed={(fileData) => {
              setUploadedFile(fileData);
              setActiveResultsTab("filtered");
              setSelectedRow(null);
              setS3UploadStatus(null);
            }}
          />

          {latestUploadStatus && (
  <p className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
    {latestUploadStatus}
  </p>
)}

          {uploadedFile && (
            <section className="grid min-w-0 gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-6">
              <div>
                <h2 className="text-lg font-semibold">Upload Summary</h2>
                <p className="text-sm text-slate-400">
                  {uploadedFile.fileName} · Sheet: {uploadedFile.sheetName}
                </p>

                <button
                  type="button"
                  onClick={handleSaveFileToS3}
                  className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
                >
                  Save File
                </button>
                <p className="py-2">Files will be deleted from database after 30 days.</p>

                {s3UploadStatus && (
                  <p className="mt-3 text-sm text-slate-300">
                    {s3UploadStatus}
                  </p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs uppercase text-slate-500">Raw Rows</p>
                  <p className="mt-2 text-2xl font-bold">
                    {uploadedFile.rawRows.length}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs uppercase text-slate-500">
                    Filtered Rows
                  </p>
                  <p className="mt-2 text-2xl font-bold">
                    {uploadedFile.filteredRows.length}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs uppercase text-slate-500">Status</p>
                  <p className="mt-2 text-2xl font-bold text-cyan-300">
                    Ready
                  </p>
                </div>
              </div>
            </section>
          )}

          {uploadedFile && (
            <section className="w-full min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 p-3 shadow-2xl shadow-black/20">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveResultsTab("filtered")}
                  className={
                    activeResultsTab === "filtered"
                      ? "rounded-2xl bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950"
                      : "rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800"
                  }
                >
                  Filtered Results
                </button>

                <button
                  type="button"
                  onClick={() => setActiveResultsTab("raw")}
                  className={
                    activeResultsTab === "raw"
                      ? "rounded-2xl bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950"
                      : "rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800"
                  }
                >
                  Raw Results
                </button>
              </div>
            </section>
          )}

          <FilteredRowsTable
            rows={activeRows}
            title={activeTitle}
            subtitle={activeSubtitle}
            emptyMessage={
              activeResultsTab === "filtered"
                ? 'No rows found containing the word "frame".'
                : "No raw rows found."
            }
            highlightTerm={activeResultsTab === "filtered" ? "frame" : undefined}
            onRowClick={activeResultsTab === "filtered" ? setSelectedRow : undefined}
            dateRanges={
              uploadedFile
                ? [
                  {
                    label: "Raw file date range",
                    value: rawDateRange,
                  },
                  {
                    label: "Filtered frame date range",
                    value: filteredDateRange,
                  },
                ]
                : []
            }
          />

          <RowDetailsModal
            row={selectedRow}
            onClose={() => setSelectedRow(null)}
            highlightTerm="frame"
          />
        </div>
      </section>
    </main>
  );
}

export default App;