import React from "react";
import { Provider } from "react-redux";
import configureStore from "./redux/store/configureStore";
import { Controller } from "./controller";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import "styles/text.css";
import "styles/index.css";

const store = configureStore();

const App = () => (
  <div className="App">
    <Provider store={store}>
      <Controller />
    </Provider>
  </div>
);

export default App;
