import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ isLoading }) => {
  if (isLoading)
    return (
      <Spinner animation="border" role="status" variant="primary">
        <span className="sr-only">X</span>
      </Spinner>
    );
  else return null;
};

export default Loader;
