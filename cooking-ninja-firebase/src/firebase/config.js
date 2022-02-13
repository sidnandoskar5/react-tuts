import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA81o825z8sjU5T-J6hzFiGsHXqD8ivU7M",
  authDomain: "cooking-ninja-site-e0502.firebaseapp.com",
  projectId: "cooking-ninja-site-e0502",
  storageBucket: "cooking-ninja-site-e0502.appspot.com",
  messagingSenderId: "53132647968",
  appId: "1:53132647968:web:0733414886aec49e42a645"
};

//init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

export { projectFirestore }