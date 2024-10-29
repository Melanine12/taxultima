import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";


import ArgonDashboard from "./argon-dashboard";
// Import the Poppins font globally
import './assets/css/fonts.css'; // Assuming you create this file for global styles

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
