export type SpreadsheetCellValue = string | number | boolean | null;

export type SpreadsheetRow = Record<string, SpreadsheetCellValue>;

export type ParsedExcelFile = {
  fileName: string;
  sheetName: string;
  rows: SpreadsheetRow[];
};