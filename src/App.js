import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { ToastContainer } from "react-toastify";
import reducer from "./reducers";
import saga from "./saga";
import theme from "./theme";
import AuthComponent from "./components/AuthComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.min.css";
import "react-toastify/dist/ReactToastify.css";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
  .form-check-inline .form-check-input {
    margin-right: 0 !important;
  }
  svg {
    cursor: pointer;
  }
`;
// 리덕스 활성화
const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);
const store = createStore(reducer, composeWithDevTools(middleware));
sagaMiddleware.run(saga);

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        <AuthComponent />
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  );
};
