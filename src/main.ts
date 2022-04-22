import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import Paginate from "vuejs-paginate-next";
// Code added for firebase configuration and intialization
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// The default content 
const app = createApp(App);

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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(appFire)

app.use(router); 
app.use(store); 
app.use(Paginate);

app.mount("#app");

export default db;

