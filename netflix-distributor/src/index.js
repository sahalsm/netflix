import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'normalize.css';
import { GlobalStyles } from "./global-style";
import {firebase} from "./lib/firebase.prod"
import { FirebaseContext } from './context/firebase';


import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <FirebaseContext.Provider value={{firebase}}>
        <GlobalStyles/>
        <App />
    </FirebaseContext.Provider>
        
    </>
);
