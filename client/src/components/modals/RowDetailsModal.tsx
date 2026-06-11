import { useEffect } from "react";
import { X } from "lucide-react";
import type { SpreadsheetRow } from "../../types/excel.types";

type RowDetailsModalProps = {
  row: SpreadsheetRow | null;
  onClose: () => void;
  highlightTerm?: string;
};

function formatCellValue(value: SpreadsheetRow[string]) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

export function RowDetailsModal({
  row,
  onClose,
  highlightTerm,
}: RowDetailsModalProps) {
  useEffect(() => {
    if (!row) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [row, onClose]);

  if (!row) return null;

  const entries = Object.entries(row);
  const normalizedHighlightTerm = highlightTerm?.trim().toLowerCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 bg-slate-900 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Row Details
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              {formatCellValue(row["Job Name"]) ||
                formatCellValue(row["Job Num"]) ||
                "Selected Row"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Full contents from the selected filtered Excel row.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-950 p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close row details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          <div className="mb-5 grid gap-4 md:grid-cols-3">
            <SummaryCard label="Job Num" value={formatCellValue(row["Job Num"])} />
            <SummaryCard label="Status" value={formatCellValue(row["Status"])} />
            <SummaryCard
              label="Op Due Date"
              value={formatCellValue(row["Op Due Date"])}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {entries.map(([column, rawValue]) => {
              const value = formatCellValue(rawValue);
              const shouldHighlight =
                normalizedHighlightTerm &&
                value.toLowerCase().includes(normalizedHighlightTerm);

              return (
                <div
                  key={column}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {column}
                  </p>

                  <p
                    className={
                      shouldHighlight
                        ? "mt-2 whitespace-pre-wrap break-words rounded-xl bg-cyan-400/10 px-3 py-2 text-sm font-semibold leading-6 text-cyan-100"
                        : "mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-200"
                    }
                  >
                    {value || "—"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-800 bg-slate-900/80 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 truncate text-lg font-bold text-white" title={value}>
        {value || "—"}
      </p>
    </div>
  );
}