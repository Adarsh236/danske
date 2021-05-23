export const DataSeparate = (dataString) => {
  const dataStringLines = dataString.split(/\r\n|\n/);
  const headers = dataStringLines[0].split(
    /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
  );

  const list = [];
  for (let index = 1; index < dataStringLines.length; index++) {
    const row = dataStringLines[index].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );
    if (headers && row.length == headers.length) {
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        let d = row[j];
        if (d.length > 0) {
          if (d[0] == '"') d = d.substring(1, d.length - 1);
          if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
        }
        if (headers[j]) {
          obj[headers[j]] = d;
        }
      }
      // remove the blank rows
      if (Object.values(obj).filter((x) => x).length > 0) {
        list.push(obj);
      }
    }
  }

  // columns list from headers
  const columns = headers.map((data) => ({
    title: data,
    field: data,
  }));

  const collection = {
    data: list,
    columns: columns,
  };

  return collection;
};
