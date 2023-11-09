// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
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
const dbref = ref(db);

let EmailInp = document.getElementById('emailInp');
let PassInp = document.getElementById('passwordInp');
let MainForm = document.getElementById('loginForm');

let SignInUser = evt => {
    evt.preventDefault();

    signInWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
    .then((credentials) =>{
        get(child(dbref, 'UsersAuthList/' + credentials.user.uid)).then((snapshot)=>{
            if(snapshot.exists){
                sessionStorage.setItem("user-info", JSON.stringify({
                    firstname: snapshot.val().firstname,
                    lastname: snapshot.val().lastname
                }))
                sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                window.location.href = 'index.html'
            }
        })
    })
    .catch((error) =>{
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    })
}
MainForm.addEventListener('submit', SignInUser);