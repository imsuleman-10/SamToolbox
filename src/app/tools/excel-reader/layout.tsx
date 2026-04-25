import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Excel & CSV Reader - View Spreadsheets Locally | SamToolbox",
  description:
    "Instantly read and interact with Excel (.xlsx, .xls) and CSV sheets directly in your browser. Local processing with zero uploads — complete data privacy, instant results, and 100% free forever.",
  keywords:
    "excel reader, csv viewer, spreadsheet viewer, xlsx reader, local excel viewer, secure spreadsheet reader, free excel viewer, csv file reader, browser spreadsheet, data viewer local",
  openGraph: {
    title: "Excel & CSV Reader | SamToolbox",
    description:
      "Read Excel and CSV files locally with complete privacy and zero uploads.",
    type: "website",
    url: "https://samtoolbox.com/tools/excel-reader",
  },
};

export default function ExcelReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}