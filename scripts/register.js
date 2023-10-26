// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdHFGZGkvS_lBC3HJsrYib6gjQpUAa-nk",
  authDomain: "recipe-website-c6592.firebaseapp.com",
  projectId: "recipe-website-c6592",
  storageBucket: "recipe-website-c6592.appspot.com",
  messagingSenderId: "64456902131",
  appId: "1:64456902131:web:5ece7ec3c8045aa63a3e86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

let EmailInp = document.getElementById('emailInp');
let PassInp = document.getElementById('passwordInp');
let FnameInp = document.getElementById('fnameInp');
let LnameInp = document.getElementById('lnameInp');
let MainForm = document.getElementById('MainForm');

let RegisterUser = evt => {
    evt.preventDefault();

    createUserWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
    .then((credentials) =>{
      console.log(credentials);
        set(ref(db, 'UsersAuthList/' + credentials.user.uid),{
            firstname: FnameInp.value,
            lastname: LnameInp.value
        })
        .then(() => {
            window.location.href = 'login.html';
        });
    })
    .catch((error) =>{
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    })
}
MainForm.addEventListener('submit', RegisterUser);
