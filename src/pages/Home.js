import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import SaveAltOutlinedIcon from "@material-ui/icons/SaveAltOutlined";
import Button from "@material-ui/core/Button";

import {
  updateJson,
  handleFileUpload,
  handleFileDownload,
} from "components/CustomFileReader";
import CustomTableView from "components/CustomTableView";
import Loader from "components/Loader";
import { addUserFile } from "redux/actions/userFile";

export default function Home() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [json, setJson] = useState();
  const isLoading = useSelector((state) => state.userFileReducer.loading);

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
        <div>
          <span className="underline-custom1 title2">
            {name ? name.split(".")[0] : "No Table Found"}
          </span>
        </div>
        <Loader isLoading={isLoading} />
        {!isLoading ? render_buttons(name, data, json, dispatch) : null}
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

const handleFileSave = async (name, data, json, dispatch) => {
  const newJson = updateJson(data, json);
  const body = JSON.stringify({
    name: name,
    jsonFile: newJson,
  });
  dispatch(addUserFile(body));
};

const render_buttons = (name, data, json, dispatch) => {
  if (name)
    return (
      <div style={{ textAlign: "center", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ margin: "10px" }}
          onClick={() => handleFileSave(name, data, json, dispatch)}
        >
          <SaveIcon />
          Save To Database
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={() => handleFileDownload(name, data, json)}
        >
          <SaveAltOutlinedIcon />
          Download File
        </Button>
      </div>
    );
};
