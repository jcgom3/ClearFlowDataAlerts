// import type { SpreadsheetRow } from "../../types/excel.types";

// type DateRangeSummary = {
//   label: string;
//   value: string | null;
// };

// type FilteredRowsTableProps = {
//   rows: SpreadsheetRow[];
//   title: string;
//   subtitle: string;
//   emptyMessage: string;
//   dateRanges?: DateRangeSummary[];
//   highlightTerm?: string;
// };

// function getColumnsFromRows(rows: SpreadsheetRow[]) {
//   const columnSet = new Set<string>();

//   for (const row of rows) {
//     Object.keys(row).forEach((key) => columnSet.add(key));
//   }

//   return Array.from(columnSet);
// }

// function formatCellValue(value: SpreadsheetRow[string]) {
//   if (value === null || value === undefined) {
//     return "";
//   }

//   return String(value);
// }

// export function FilteredRowsTable({
//   rows,
//   title,
//   subtitle,
//   emptyMessage,
//   dateRanges = [],
//   highlightTerm,
// }: FilteredRowsTableProps) {
//   const columns = getColumnsFromRows(rows);
//   const normalizedHighlightTerm = highlightTerm?.toLowerCase().trim();

//   if (rows.length === 0) {
//     return (
//       <section className="w-full min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-2xl shadow-black/20 sm:p-6">
//         <h2 className="text-xl font-bold text-white">{title}</h2>
//         <p className="mt-2 text-sm text-slate-400">{emptyMessage}</p>
//       </section>
//     );
//   }

//   return (
//     <section className="w-full min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-2xl shadow-black/20 sm:p-6">
//       <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
//         <div>
//           {dateRanges.length > 0 && (
//             <div className="mb-5 grid gap-3 md:grid-cols-2">
//               {dateRanges.map((dateRange) => (
//                 <div
//                   key={dateRange.label}
//                   className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3"
//                 >
//                   <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     {dateRange.label}
//                   </p>
//                   <p className="mt-1 text-sm font-semibold text-cyan-200">
//                     {dateRange.value ?? "No dates found"}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}

//           <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
//             Results
//           </p>

//           <h2 className="mt-2 text-xl font-bold text-white">{title}</h2>

//           <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
//         </div>
//       </div>

//       <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-800">
//         <div className="max-h-[620px] overflow-auto">
//           <table className="w-full min-w-[1400px] border-collapse text-left text-sm">
//             <thead className="sticky top-0 z-10 bg-slate-950 text-xs uppercase tracking-wide text-slate-400">
//               <tr>
//                 {columns.map((column) => (
//                   <th
//                     key={column}
//                     className="whitespace-nowrap border-b border-slate-800 px-4 py-3 font-bold"
//                   >
//                     {column}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {rows.map((row, rowIndex) => (
//                 <tr
//                   key={rowIndex}
//                   className="border-b border-slate-800/80 hover:bg-cyan-400/5"
//                 >
//                   {columns.map((column) => {
//                     const value = formatCellValue(row[column]);
//                     const shouldHighlight =
//                       normalizedHighlightTerm &&
//                       value.toLowerCase().includes(normalizedHighlightTerm);

//                     return (
//                       <td
//                         key={column}
//                         className="max-w-[360px] whitespace-nowrap px-4 py-3 text-slate-300"
//                         title={value}
//                       >
//                         <span
//                           className={
//                             shouldHighlight
//                               ? "rounded-md bg-cyan-400/10 px-2 py-1 font-semibold text-cyan-200"
//                               : ""
//                           }
//                         >
//                           {value}
//                         </span>
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   );
// }

// import type { SpreadsheetRow } from "../../types/excel.types";

// type DateRangeSummary = {
//   label: string;
//   value: string | null;
// };

// type FilteredRowsTableProps = {
//   rows: SpreadsheetRow[];
//   title: string;
//   subtitle: string;
//   emptyMessage: string;
//   dateRanges?: DateRangeSummary[];
//   highlightTerm?: string;
// };

// const COLUMN_WIDTHS: Record<string, string> = {
//   "Job Due Date": "w-[140px]",
//   "1st Open Oper": "w-[150px]",
//   Status: "w-[130px]",
//   "Job Num": "w-[140px]",
//   "Job Name": "w-[160px]",
//   "Part Description": "w-[160px]",
//   "Job Qty": "w-[110px]",
//   "Opr Qty": "w-[110px]",
//   "Opr Qty Compl": "w-[140px]",
//   "Op St Date": "w-[140px]",
//   "Start Time": "w-[130px]",
//   "Op Due Date": "w-[140px]",
//   "Est Prod Hrs": "w-[140px]",
//   OpDesc: "w-[160px]",
//   Part: "w-[160px]",
// };

// function getColumnWidth(column: string) {
//   return COLUMN_WIDTHS[column] ?? "w-[160px]";
// }

// function getColumnsFromRows(rows: SpreadsheetRow[]) {
//   const columnSet = new Set<string>();

//   for (const row of rows) {
//     Object.keys(row).forEach((key) => columnSet.add(key));
//   }

//   return Array.from(columnSet);
// }

// function formatCellValue(value: SpreadsheetRow[string]) {
//   if (value === null || value === undefined) {
//     return "";
//   }

//   return String(value);
// }

// export function FilteredRowsTable({
//   rows,
//   title,
//   subtitle,
//   emptyMessage,
//   dateRanges = [],
//   highlightTerm,
// }: FilteredRowsTableProps) {
//   const columns = getColumnsFromRows(rows);
//   const normalizedHighlightTerm = highlightTerm?.toLowerCase().trim();

//   if (rows.length === 0) {
//     return (
//       <section className="w-full min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-2xl shadow-black/20 sm:p-6">
//         <h2 className="text-xl font-bold text-white">{title}</h2>
//         <p className="mt-2 text-sm text-slate-400">{emptyMessage}</p>
//       </section>
//     );
//   }

//   return (
//     <section className="w-full min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-2xl shadow-black/20 sm:p-6">
//       <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
//         <div className="w-full">
//           {dateRanges.length > 0 && (
//             <div className="mb-5 grid gap-3 md:grid-cols-2">
//               {dateRanges.map((dateRange) => (
//                 <div
//                   key={dateRange.label}
//                   className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3"
//                 >
//                   <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     {dateRange.label}
//                   </p>
//                   <p className="mt-1 text-sm font-semibold text-cyan-200">
//                     {dateRange.value ?? "No dates found"}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}

//           <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
//             Results
//           </p>

//           <h2 className="mt-2 text-xl font-bold text-white">{title}</h2>

//           <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
//         </div>
//       </div>

//       <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-800">
//         <div className="max-h-[620px] overflow-auto">
//           <table className="table-fixed border-collapse text-left text-sm">
//             <thead className="sticky top-0 z-10 bg-slate-950 text-xs uppercase tracking-wide text-slate-400">
//               <tr>
//                 {columns.map((column) => (
//                   <th
//                     key={column}
//                     className={`${getColumnWidth(
//                       column
//                     )} border-b border-slate-800 px-4 py-3 font-bold`}
//                   >
//                     <div className="truncate" title={column}>
//                       {column}
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {rows.map((row, rowIndex) => (
//                 <tr
//                   key={rowIndex}
//                   className="border-b border-slate-800/80 hover:bg-cyan-400/5"
//                 >
//                   {columns.map((column) => {
//                     const value = formatCellValue(row[column]);
//                     const shouldHighlight =
//                       normalizedHighlightTerm &&
//                       value.toLowerCase().includes(normalizedHighlightTerm);

//                     return (
//                       <td
//                         key={column}
//                         className={`${getColumnWidth(
//                           column
//                         )} overflow-hidden px-4 py-3 text-slate-300`}
//                       >
//                         <div
//                           title={value}
//                           className={
//                             shouldHighlight
//                               ? "truncate rounded-md bg-cyan-400/10 px-2 py-1 font-semibold text-cyan-200"
//                               : "truncate"
//                           }
//                         >
//                           {value}
//                         </div>
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   );
// }

import type { SpreadsheetRow } from "../../types/excel.types";

type DateRangeSummary = {
  label: string;
  value: string | null;
};

type FilteredRowsTableProps = {
  rows: SpreadsheetRow[];
  title: string;
  subtitle: string;
  emptyMessage: string;
  dateRanges?: DateRangeSummary[];
  highlightTerm?: string;
  onRowClick?: (row: SpreadsheetRow) => void;
};

const COLUMN_WIDTHS: Record<string, number> = {
  "Job Due Date": 118,
  "1st Open Oper": 180,
  Status: 120,
  "Job Num": 120,
  "Job Name": 200,
  "Part Description": 200,
  "Job Qty": 90,
  "Opr Qty": 90,
  "Opr Qty Compl": 150,
  "Op St Date": 118,
  "Start Time": 110,
  "Op Due Date": 118,
  "Est Prod Hrs": 120,
  OpDesc: 160,
  Part: 145,
};

const DEFAULT_COLUMN_WIDTH = 180;

function getColumnWidth(column: string) {
  return COLUMN_WIDTHS[column] ?? DEFAULT_COLUMN_WIDTH;
}

function getColumnsFromRows(rows: SpreadsheetRow[]) {
  const columnSet = new Set<string>();

  for (const row of rows) {
    Object.keys(row).forEach((key) => columnSet.add(key));
  }

  return Array.from(columnSet);
}

function formatCellValue(value: SpreadsheetRow[string]) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

function getTableWidth(columns: string[]) {
  return columns.reduce((total, column) => total + getColumnWidth(column), 0);
}

export function FilteredRowsTable({
    rows,
  title,
  subtitle,
  emptyMessage,
  dateRanges = [],
  highlightTerm,
  onRowClick,
}: FilteredRowsTableProps) {
  const columns = getColumnsFromRows(rows);
  const tableWidth = getTableWidth(columns);
  const normalizedHighlightTerm = highlightTerm?.toLowerCase().trim();

  if (rows.length === 0) {
    return (
      <section className="w-full min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-2xl shadow-black/20 sm:p-6">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="mt-2 text-sm text-slate-400">{emptyMessage}</p>
      </section>
    );
  }

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-2xl shadow-black/20 sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div className="w-full">
          {dateRanges.length > 0 && (
            <div className="mb-5 grid gap-3 md:grid-cols-2">
              {dateRanges.map((dateRange) => (
                <div
                  key={dateRange.label}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {dateRange.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-cyan-200">
                    {dateRange.value ?? "No dates found"}
                  </p>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Results
          </p>

          <h2 className="mt-2 text-xl font-bold text-white">{title}</h2>

          <p className="mt-1 text-sm text-slate-400">{subtitle}</p>

          {onRowClick && (
  <p className="mt-2 text-xs font-medium text-cyan-300/80">
    Click a row to view full details.
  </p>
)}
        </div>
      </div>

      <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-800">
        <div className="data-grid-scroll max-h-[620px] w-full max-w-full overflow-auto">
          <table
            className="table-fixed border-collapse text-left text-sm"
            style={{
              width: `${tableWidth}px`,
              minWidth: `${tableWidth}px`,
            }}
          >
            <colgroup>
              {columns.map((column) => (
                <col
                  key={column}
                  style={{
                    width: `${getColumnWidth(column)}px`,
                  }}
                />
              ))}
            </colgroup>

            <thead className="sticky top-0 z-10 bg-slate-950 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    className="border-b border-slate-800 px-3 py-3 font-bold"
                  >
                    <span className="data-grid-cell" title={column}>
                      {column}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
  key={rowIndex}
  onClick={() => onRowClick?.(row)}
  className={
    onRowClick
      ? "cursor-pointer border-b border-slate-800/80 transition hover:bg-cyan-400/10"
      : "border-b border-slate-800/80 hover:bg-cyan-400/5"
  }
>
                  {columns.map((column) => {
                    const value = formatCellValue(row[column]);
                    const shouldHighlight =
                      normalizedHighlightTerm &&
                      value.toLowerCase().includes(normalizedHighlightTerm);

                    return (
                      <td
                        key={column}
                        className="overflow-hidden px-3 py-3 text-slate-300"
                      >
                        <span
                          title={value}
                          className={
                            shouldHighlight
                              ? "data-grid-cell-highlight"
                              : "data-grid-cell"
                          }
                        >
                          {value}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}