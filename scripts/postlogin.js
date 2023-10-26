import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

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
const auth = getAuth(app);

// DOM is assumed to be loaded because script is at the end of HTML body
const logoutBtn = document.getElementById('logoutBtn');
const loginBtn = document.getElementById('loginBtn');
const savedRecipes = document.getElementById('savedRecipes')

logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
});

onAuthStateChanged(auth, (user) => {
    const savedRecipes = document.getElementById('savedRecipes');
  
    if (user) {
      // User is signed in
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline';
      savedRecipes.style.display = 'inline'; 
    } else {
      // No user is signed in
      loginBtn.style.display = 'inline';
      logoutBtn.style.display = 'none';
      savedRecipes.style.display = 'none';
    }
  });
  