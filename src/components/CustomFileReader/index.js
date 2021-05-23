import * as XLSX from "xlsx";

import { DataSeparate } from "./DataSeparate";

export const handleFileUpload = (e, setName, setColumns, setData, setJson) => {
  const reader = new FileReader();
  const file = e.target.files[0];

  reader.onload = (evt) => {
    // Parse data
    const bstr = evt.target.result;
    const wb = XLSX.read(bstr, { type: "binary" });
    // Get first worksheet
    const worksheetName = wb.SheetNames[0];
    const worksheet = wb.Sheets[worksheetName];
    // Convert array of arrays
    const convertedCSVFromSheet = XLSX.utils.sheet_to_csv(worksheet, {
      header: 1,
    });
    const convertedJsonFromSheet = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
    });
    const getCollection = DataSeparate(convertedCSVFromSheet);

    setName(file.name);
    setColumns(getCollection.columns);
    setData(getCollection.data);
    setJson(convertedJsonFromSheet);
  };

  try {
    reader.readAsBinaryString(file);
  } catch (error) {
    console.log(error);
  }
};

export const handleFileDownload = (name, data) => {
  const ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "sheet");
  const buf = XLSX.write(wb, { bookType: "csv", type: "buffer" }); // generate a nodejs buffer
  const str = XLSX.write(wb, { bookType: "csv", type: "binary" }); // generate a binary string in web browser

  XLSX.writeFile(wb, name);
};
