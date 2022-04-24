import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import Paginate from "vuejs-paginate-next";
/*------------- Imports for Firebase Configuration---------------*/
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { browserLocalPersistence,getAuth, setPersistence } from "firebase/auth";
/*------------- END: Imports for Firebase Configuration---------------*/


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

// Initialize Firebase, Authentication Instance and Persistence
const appFire = initializeApp(firebaseConfig);
const auth = getAuth(appFire);
setPersistence(auth, browserLocalPersistence)
.then(() => {
  // Persistence setted succefully 
})
.catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log("Error "+errorCode+" : "+errorMessage);
});

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(appFire)

app.use(router); 
app.use(store); 
app.use(Paginate);

app.mount("#app");

export {db, auth};// share the firestore database and the authentication instance with components

