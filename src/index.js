import { AppContainer } from "react-hot-loader";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";

const render = (Component) =>
  ReactDOM.render(
    <AppContainer>
      <StrictMode>
        <Component />
      </StrictMode>
    </AppContainer>,
    document.getElementById("root")
  );

render(App);

if (module.hot) module.hot.accept("./App", () => render(App));
