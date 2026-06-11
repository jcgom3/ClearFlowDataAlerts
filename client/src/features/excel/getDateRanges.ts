import type { SpreadsheetRow } from "../../types/excel.types";

const DATE_COLUMNS = ["Job Due Date", "Op St Date", "Op Due Date"];

function parseDateValue(value: unknown): Date | null {
  if (!value) return null;

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getRowsDateRange(rows: SpreadsheetRow[]): string | null {
  const dates: Date[] = [];

  for (const row of rows) {
    for (const column of DATE_COLUMNS) {
      const date = parseDateValue(row[column]);

      if (date) {
        dates.push(date);
      }
    }
  }

  if (dates.length === 0) {
    return null;
  }

  const earliestDate = new Date(
    Math.min(...dates.map((date) => date.getTime()))
  );

  const latestDate = new Date(Math.max(...dates.map((date) => date.getTime())));

  return `${formatDate(earliestDate)} – ${formatDate(latestDate)}`;
}