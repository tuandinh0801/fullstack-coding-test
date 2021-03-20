import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDGwOfBloXZ01fYuU1m6e5pRkx1or5UkgE",
    authDomain: "fullstack-coding-test.firebaseapp.com",
    projectId: "fullstack-coding-test",
    storageBucket: "fullstack-coding-test.appspot.com",
    messagingSenderId: "139625461829",
    appId: "1:139625461829:web:0adfc8525083a87db20b2c"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
