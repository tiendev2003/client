import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// thư viện JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// CSS
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </StrictMode>
);
