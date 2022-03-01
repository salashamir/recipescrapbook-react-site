import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBj8asTIelEbG1P4b__6teSJQnJGpSrGR0",
  authDomain: "recipescrapbook-de2fa.firebaseapp.com",
  projectId: "recipescrapbook-de2fa",
  storageBucket: "recipescrapbook-de2fa.appspot.com",
  messagingSenderId: "557040969496",
  appId: "1:557040969496:web:3dfe4eb439049e7a73a06d",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

// export
export { projectFirestore };
