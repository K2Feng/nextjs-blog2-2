import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCvGaIAZAcRqGXijYlq3fX8YZL2D3QzAMk",
  authDomain: "blogapp-f53bc.firebaseapp.com",
  projectId: "blogapp-f53bc",
  storageBucket: "blogapp-f53bc.appspot.com",
  messagingSenderId: "922625350087",
  appId: "1:922625350087:web:babcd1d52a1e02f16361e2"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}

const fire = firebase;
export default fire;
