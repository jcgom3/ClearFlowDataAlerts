import { useState } from "react";
import { Upload } from "lucide-react";
import { parseExcelFile } from "../../features/excel/parseExcelFile";
import { filterRows } from "../../features/excel/filterRows";
import type { SpreadsheetRow } from "../../types/excel.types";

type FileUploadPanelProps = {
  onRowsParsed: (data: {
    file: File;
    fileName: string;
    sheetName: string;
    rawRows: SpreadsheetRow[];
    filteredRows: SpreadsheetRow[];
  }) => void;
};

export function FileUploadPanel({ onRowsParsed }: FileUploadPanelProps) {
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError(null);

    try {
      const parsed = await parseExcelFile(file);
      const filteredRows = filterRows(parsed.rows);

      onRowsParsed({
        file,
        fileName: parsed.fileName,
        sheetName: parsed.sheetName,
        rawRows: parsed.rows,
        filteredRows,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to parse file.";
      setError(message);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-300">
          <Upload size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold">Upload production file</h2>
          <p className="text-sm text-slate-400">
            Upload .xlsx, .xls, or .csv files for filtering and alert review.
          </p>
        </div>
      </div>

      <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/70 px-6 py-10 text-center hover:border-cyan-400">
        <span className="text-sm font-medium text-slate-200">
          Select Excel or CSV file
        </span>

        <span className="mt-1 text-xs text-slate-500">
          File will be parsed locally first, then uploaded to S3 after review.
        </span>

        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {error && (
        <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
    </section>
  );
}