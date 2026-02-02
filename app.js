// 1. Importation des fonctions nécessaires depuis le SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 2. Ta configuration Firebase (À RÉCUPÉRER SUR TA CONSOLE FIREBASE)
const firebaseConfig = {
    apiKey: "TON_API_KEY",
    authDomain: "TON_PROJET.firebaseapp.com",
    projectId: "TON_PROJET_ID",
    storageBucket: "TON_PROJET.appspot.com",
    messagingSenderId: "TON_SENDER_ID",
    appId: "TON_APP_ID"
};

// 3. Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Éléments HTML
const loggedOutDiv = document.getElementById('auth-logged-out');
const loggedInDiv = document.getElementById('auth-logged-in');
const btnLogin = document.getElementById('btn-login');
const btnLogout = document.getElementById('btn-logout');

// --- FONCTION DE CONNEXION ---
btnLogin.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            // Vérification du domaine mail
            if (!user.email.endsWith('@savio-lambersart.com')) {
                alert("Accès refusé : utilise ton mail @savio-lambersart.com");
                signOut(auth); // On le déconnecte s'il n'a pas le bon mail
            }
        })
        .catch((error) => {
            console.error("Erreur de connexion", error);
        });
});

// --- FONCTION DE DÉCONNEXION ---
btnLogout.addEventListener('click', () => {
    signOut(auth);
});

// --- SURVEILLANCE DE L'ÉTAT (Gère l'affichage des boutons) ---
onAuthStateChanged(auth, (user) => {
    if (user && user.email.endsWith('@savio-lambersart.com')) {
        // Utilisateur connecté avec le bon mail
        loggedOutDiv.style.display = 'none';   // Cache "Commencer" en haut
        loggedInDiv.style.display = 'block';  // Affiche "Déconnexion" en bas
    } else {
        // Utilisateur déconnecté ou mauvais mail
        loggedOutDiv.style.display = 'block';
        loggedInDiv.style.display = 'none';
    }
});
