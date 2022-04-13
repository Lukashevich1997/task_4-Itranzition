import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBlFQmF_3Z5gx2zi5SeidMLxaEfPkSFUqY",
    authDomain: "my-web-app-d0375.firebaseapp.com",
    databaseURL: "https://my-web-app-d0375-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "my-web-app-d0375",
    storageBucket: "my-web-app-d0375.appspot.com",
    messagingSenderId: "885077274969",
    appId: "1:885077274969:web:3de9f3fec624dd95695c48"
  };

  const fire = initializeApp(firebaseConfig);
  export const auth = getAuth(fire);
  