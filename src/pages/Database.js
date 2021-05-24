import React, { Component } from "react";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

import Loader from "components/Loader";
import { fetchUserFile, deleteUserFileById } from "redux/actions/userFile";

class Database extends Component {
  async componentDidMount() {
    const { getUserFile } = this.props;
    getUserFile();
  }

  timeConvert(time) {
    const date = new Date(time);
    return date.toString();
  }

  async handleDeleteFile(id, index) {
    const { deleteUserFileById, userFiles } = this.props;
    const newList = userFiles.filter((item, i) => i !== index);
    deleteUserFileById(id, newList);
  }

  render() {
    const { isLoading, userFiles } = this.props;
    const length = userFiles.length;

    return (
      <div>
        <div className="background1">
          <div className="container">
            <div className="row justify-content-center align-items-center height1">
              <div className="col-8 ">
                <h3>All Stored File In MongoDB</h3>
              </div>
            </div>
          </div>
        </div>
        <Loader isLoading={isLoading} />
        {!isLoading ? (
          <div className="box1">
            <span className="underline-custom1 title2">
              {length ? `Results (${length})` : "No Data Found"}
            </span>
            <div className="container">
              <ul className="responsive-table">
                {this.render_content(userFiles)}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  render_content = (contents) =>
    contents.map((data, index) => {
      const id = data.id;
      const link = "/view-table/" + id;
      return (
        <>
          <hr className="footnotes-sep" />
          <li className="table-row">
            <div className="col-4">
              <div className="bodyText1">
                {this.timeConvert(data.createdAt)}
              </div>
            </div>
            <div className="col-6">
              <a href={link}>
                <span className="bodyText1 underline-custom1">
                  {data.name + " >"}
                </span>
              </a>
            </div>
            <div className="col-2">
              <Button
                variant="contained"
                color="primary"
                size="medium"
                style={{ margin: "10px" }}
                onClick={() => this.handleDeleteFile(id, index)}
              >
                <DeleteIcon />
                Delete File
              </Button>
            </div>
          </li>
        </>
      );
    });
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.userFileReducer.loading,
    userFiles: state.userFileReducer.userFiles,
    error: state.userFileReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserFile: () => dispatch(fetchUserFile()),
    deleteUserFileById: (id, list) => {
      dispatch(deleteUserFileById(id, list));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Database);
