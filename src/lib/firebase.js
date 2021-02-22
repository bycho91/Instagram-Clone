// import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyDx0wQ2Nd04cTKEq9QTTSXTgHtSrsMhz3o",
  authDomain: "instagram-clone-26700.firebaseapp.com",
  projectId: "instagram-clone-26700",
  storageBucket: "instagram-clone-26700.appspot.com",
  messagingSenderId: "341926349359",
  appId: "1:341926349359:web:ddb9e4b30a8c5b9fef14da",
};

const firebase = window.firebase.initializeApp(config);
const { FieldValue } = window.firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
