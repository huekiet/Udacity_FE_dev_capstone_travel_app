import "./styles/reset.scss";
import "./styles/style.scss";
import "./styles/form.scss";

import { initialize } from "./js/init";

initialize()

if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
