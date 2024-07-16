// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY_FIRE_BASE,
    authDomain: 'e-commerce-c9b1d.firebaseapp.com',
    projectId: 'e-commerce-c9b1d',
    storageBucket: 'e-commerce-c9b1d.appspot.com',
    messagingSenderId: '83491888210',
    appId: '1:83491888210:web:85a75baba462a036b2d38b',
    measurementId: 'G-E002G1V19J',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageDb = getStorage();
