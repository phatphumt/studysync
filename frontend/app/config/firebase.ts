// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCJ1v3sVQK0_m77IlCsU4A7wXMSXZ8Di3I',
	authDomain: 'studysync-nsc.firebaseapp.com',
	projectId: 'studysync-nsc',
	storageBucket: 'studysync-nsc.appspot.com',
	messagingSenderId: '489125403611',
	appId: '1:489125403611:web:f7c742c4e537b8f833e5fe',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
