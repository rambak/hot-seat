const firebase = require('firebase');

var config = {
  apiKey: 'AIzaSyAwqfvXmK7JxJNjqTXcHq1pHaPcFby2VCQ',
  authDomain: 'hot-seat-444.firebaseapp.com',
  databaseURL: 'https://hot-seat-444.firebaseio.com',
  projectId: 'hot-seat-444',
  storageBucket: 'hot-seat-444.appspot.com',
  messagingSenderId: '289259443681',
};
firebase.initializeApp(config);

const db = firebase.firestore();

module.exports = db;
