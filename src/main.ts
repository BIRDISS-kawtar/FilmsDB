import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store'

const app = createApp(App).use(store);

app.use(router);

app.mount("#app");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAPpU4VBh4FFhVKP1zG1ASIxKxM_zCQETg",
  authDomain: "bd-film-cf5a8.firebaseapp.com",
  projectId: "bd-film-cf5a8",
  storageBucket: "bd-film-cf5a8.appspot.com",
  messagingSenderId: "381842253387",
  appId: "1:381842253387:web:ce95f739d4bee3e8430fce",
  measurementId: "G-VR8SX73DHP"
};

// Initialize Firebase
const appFire = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFire);

