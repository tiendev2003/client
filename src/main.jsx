import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// thư viện JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
//
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import App from "./App.jsx";
import "./assets/css/style-admin.css";
import store from "./store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
    ,
  </StrictMode>
);
