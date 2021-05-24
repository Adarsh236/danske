import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import SaveAltOutlinedIcon from "@material-ui/icons/SaveAltOutlined";
import Button from "@material-ui/core/Button";
import ApiService from "api/ApiService";

import {
  updateJson,
  convertFromJson,
  handleFileDownload,
} from "components/CustomFileReader";
import CustomTableView from "components/CustomTableView";
import Loader from "components/Loader";
import { updateUserFile } from "redux/actions/userFile";

const ViewTable = ({ id }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [json, setJson] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserFileById(id);
  }, []);

  const fetchUserFileById = async (id) => {
    ApiService.getUserFilesById(id)
      .then((res) => {
        const data = res.result[0];
        setFile(data);
        setName(data.name);
        setJson(data.jsonFile);
        convertFromJson(data.jsonFile, setColumns, setData);
      })
      .catch((e) => {});
    setIsLoading(false);
  };

  return (
    <div>
      <div className="background1">
        <div className="container">
          <div className="row justify-content-center align-items-center height1">
            <div className="col-8 ">
              <h3>View Table</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="box1">
        {isLoading ? (
          <Loader />
        ) : (
          <span className="underline-custom1 title2">
            {name ? name : "No Table Found"}
          </span>
        )}
        {render_buttons(name, data, json, file, dispatch)}
        <CustomTableView
          name={name}
          columns={columns}
          data={data}
          setData={setData}
        />
      </div>
    </div>
  );
};

const handleFileUpdate = async (data, json, file, dispatch) => {
  const newJson = updateJson(data, json);
  file.jsonFile = newJson;
  console.log("file", file);
  dispatch(updateUserFile(file.id, file));
};

const render_buttons = (name, data, json, file, dispatch) => {
  if (name)
    return (
      <div style={{ textAlign: "center", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ margin: "10px" }}
          onClick={() => handleFileUpdate(data, json, file, dispatch)}
        >
          <SaveIcon />
          Update In Database
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={() => handleFileDownload("NewFile.csv", data, json)}
        >
          <SaveAltOutlinedIcon />
          Download File
        </Button>
      </div>
    );
};

export default ViewTable;
