import * as XLSX from "xlsx";

import { DataSeparate } from "./DataSeparate";

const header = {
  header: 1,
};

export const updateJson = (data, json) => {
  let newJson = [];
  newJson.push(json[0]);
  data.forEach((obj) => {
    let values = Object.keys(obj).map(function (key) {
      return obj[key];
    });
    values.pop();
    newJson.push(values);
  });
  return newJson;
};

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

    const convertedCSVFromSheet = XLSX.utils.sheet_to_csv(worksheet, header);
    const convertedJsonFromSheet = XLSX.utils.sheet_to_json(worksheet, header);
    const getCollection = DataSeparate(convertedCSVFromSheet);

    setName(file.name);
    setColumns(getCollection.columns);
    setData(getCollection.data);
    setJson(convertedJsonFromSheet);
  };

  try {
    reader.readAsBinaryString(file);
  } catch (error) {}
};

export const handleFileDownload = (name, data, json) => {
  const newJson = updateJson(data, json);
  const ws = XLSX.utils.json_to_sheet(newJson, { skipHeader: true });
  const wb = XLSX.utils.book_new();
  try {
    XLSX.utils.book_append_sheet(wb, ws, "sheet");
    XLSX.writeFile(wb, name);
  } catch (error) {}
};

export const convertFromJson = (json, setColumns, setData) => {
  const worksheet = XLSX.utils.json_to_sheet(json, { skipHeader: true });
  const convertedCSVFromSheet = XLSX.utils.sheet_to_csv(worksheet, header);
  const getCollection = DataSeparate(convertedCSVFromSheet);
  setColumns(getCollection.columns);
  setData(getCollection.data);
};
