import type { SpreadsheetRow } from "../../types/excel.types";

const DEFAULT_SEARCH_TERM = "frame";

function normalizeCellValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value);
}

function rowContainsSearchTerm(row: SpreadsheetRow, searchTerm: string) {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  if (!normalizedSearchTerm) {
    return true;
  }

  return Object.values(row).some((value) =>
    normalizeCellValue(value).toLowerCase().includes(normalizedSearchTerm)
  );
}

export function filterRows(
  rows: SpreadsheetRow[],
  searchTerm = DEFAULT_SEARCH_TERM
): SpreadsheetRow[] {
  return rows.filter((row) => rowContainsSearchTerm(row, searchTerm));
}