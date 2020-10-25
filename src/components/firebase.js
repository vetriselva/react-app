import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyCvftFjYB9PYj4u2htORXlQuXqtgEXgSbg",
    authDomain: "simple-chat-45665.firebaseapp.com",
    databaseURL: "https://simple-chat-45665.firebaseio.com",
    projectId: "simple-chat-45665",
    storageBucket: "simple-chat-45665.appspot.com",
    messagingSenderId: "1036118292",
    appId: "1:1036118292:web:a8e384106bfc0b07d2fa01",
    measurementId: "G-F1HS3JVN26"

});

const db = firebaseApp.firestore();

export default db;