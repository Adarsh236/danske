import React, { useState } from "react";
import SaveIcon from "@material-ui/icons/Save";
import SaveAltOutlinedIcon from "@material-ui/icons/SaveAltOutlined";
import Button from "@material-ui/core/Button";

import {
  handleFileUpload,
  handleFileDownload,
} from "components/CustomFileReader";
import CustomTableView from "components/CustomTableView";

export default function Home() {
  const [name, setName] = useState("");
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [json, setJson] = useState();

  const handleFileSave = (e) => {
    console.log("handleFileSave");
  };

  return (
    <div>
      <div className="background1">
        <div className="container">
          <div className="row justify-content-center align-items-center height1">
            <div className="col-8 ">
              <h3>Upload CSV file</h3>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={(e) =>
                  handleFileUpload(e, setName, setColumns, setData, setJson)
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="box1">
        <span className="underline-custom1 title2">
          {name ? name.split(".")[0] : "No Table Found"}
        </span>

        {name ? (
          <div style={{ textAlign: "center", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              style={{ margin: "10px" }}
              onClick={() => handleFileSave(json)}
            >
              <SaveIcon />
              Save To Database
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={() => handleFileDownload(name, json)}
            >
              <SaveAltOutlinedIcon />
              Download File
            </Button>
          </div>
        ) : null}

        <CustomTableView
          name={name}
          columns={columns}
          data={data}
          setData={setData}
        />
      </div>
    </div>
  );
}
