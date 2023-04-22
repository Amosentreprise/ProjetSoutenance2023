import { createApp } from 'vue'

import App from './App.vue'

import router from './router/index.js'
import axios from "axios";



import "./index.css";
createApp(App).use(router).mount("#app");
