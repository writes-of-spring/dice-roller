import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

it("renders without crashin g", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
