import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
  apiKey: 'AIzaSyAwqfvXmK7JxJNjqTXcHq1pHaPcFby2VCQ',
  authDomain: 'hot-seat-444.firebaseapp.com',
  databaseURL: 'https://hot-seat-444.firebaseio.com',
  projectId: 'hot-seat-444',
  storageBucket: 'hot-seat-444.appspot.com',
  messagingSenderId: '289259443681',
};
firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();

export default firebase;
