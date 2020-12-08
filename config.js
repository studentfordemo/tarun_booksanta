import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyCD7Rcu9UZ5_mo122jpMObZ7NEDyM-YFaA",
  authDomain: "booksanta-e65b6.firebaseapp.com",
  databaseURL: "https://booksanta-e65b6.firebaseio.com",
  projectId: "booksanta-e65b6",
  storageBucket: "booksanta-e65b6.appspot.com",
  messagingSenderId: "880954806855",
  appId: "1:880954806855:web:3fb4bb74ee28b229081762",
  measurementId: "G-MVR4FWDSML"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();