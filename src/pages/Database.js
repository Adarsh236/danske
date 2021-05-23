import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default class Events extends React.Component {
  state = {
    contents: [
      {
        name: "events",
        date: "July 9, 2020",
        json: [],
      },
      {
        name: "events",
        date: "July 9, 2020",
        json: [],
      },
      {
        name: "events",
        date: "July 9, 2020",
        json: [],
      },
      {
        name: "events",
        date: "July 9, 2020",
        json: [],
      },
      {
        name: "events",
        date: "July 9, 2020",
        json: [],
      },
    ],
  };

  render_content = (contents) =>
    contents.map((data, index) => (
      <>
        <hr className="footnotes-sep" />
        <li className="table-row">
          <div className="col-4">
            <div className="bodyText1">{data.date}</div>
          </div>
          <div className="col-8">
            <span className="bodyText1 underline-custom1">
              {data.name + " >"}
            </span>
          </div>
        </li>
      </>
    ));

  render() {
    const { contents } = this.state;
    return (
      <div>
        <div className="background1">
          <div className="container">
            <div className="row justify-content-center align-items-center height1">
              <div className="col-8 ">
                <h3>All Stored File</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="box1">
          <span className="underline-custom1 title2">
            {contents.length ? `Results: ${contents.length}` : "No Data Found"}
          </span>

          <div className="container">
            <ul className="responsive-table">
              {this.render_content(contents)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
