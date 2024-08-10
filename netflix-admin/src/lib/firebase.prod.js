import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// import {seedDatabase} from '../seed';

const config = {
  apiKey: "AIzaSyAp7HzGu38Ou0wbO_s0sP__l1w5-PxmD2A",
  authDomain: "netflix-5182e.firebaseapp.com",
  projectId: "netflix-5182e",
  storageBucket: "netflix-5182e.appspot.com",
  messagingSenderId: "488834810662",
  appId: "1:488834810662:web:39ce5f160f6bc99ee137e7"
};

const firebase = Firebase.initializeApp(config);
// seedDatabase(firebase);

export {firebase};