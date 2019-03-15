
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
firebase.firestore().settings({ timestampsInSnapshots: true });

export const db = firebase.firestore();

export default firebase;
