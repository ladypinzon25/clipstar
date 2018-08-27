import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB5Wbahcn7wxDU80K_SF2rr9LWjZ9YzG9k",
  authDomain: "clipstar-da0b0.firebaseapp.com",
  databaseURL: "https://clipstar-da0b0.firebaseio.com",
  projectId: "clipstar-da0b0",
  storageBucket: "clipstar-da0b0.appspot.com",
  messagingSenderId: "219452765132"
};

export const firebaseApp = firebase.initializeApp(config);