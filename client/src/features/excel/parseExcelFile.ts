import * as XLSX from "xlsx";
import type { ParsedExcelFile, SpreadsheetRow } from "../../types/excel.types";

function normalizeParsedRows(rows: Record<string, unknown>[]): SpreadsheetRow[] {
  return rows.map((row) => {
    const normalizedRow: SpreadsheetRow = {};

    for (const [key, value] of Object.entries(row)) {
      if (value instanceof Date) {
        normalizedRow[key] = value.toLocaleDateString();
      } else if (value === null || value === undefined) {
        normalizedRow[key] = "";
      } else {
        normalizedRow[key] = value as SpreadsheetRow[string];
      }
    }

    return normalizedRow;
  });
}

export async function parseExcelFile(file: File): Promise<ParsedExcelFile> {
  const buffer = await file.arrayBuffer();

  const workbook = XLSX.read(buffer, {
    type: "array",
    cellDates: true,
  });

  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error("No sheet found in this file.");
  }

  const worksheet = workbook.Sheets[sheetName];

  const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
    defval: "",
    raw: false,
  });

  const rows = normalizeParsedRows(rawRows);

  return {
    fileName: file.name,
    sheetName,
    rows,
  };
}