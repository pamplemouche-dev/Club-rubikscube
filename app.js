import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, 
    onAuthStateChanged, signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB9CSBSLpB_DnXmBcfGm_h_cGGFYVYn2nA",
    authDomain: "club-rubik.firebaseapp.com",
    projectId: "club-rubik",
    storageBucket: "club-rubik.firebasestorage.app",
    messagingSenderId: "660354395142",
    appId: "1:660354395142:web:662c0646a37d24755ea787"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// --- FONCTION INSCRIPTION ---
export const registerEmail = (email, password) => {
    if (!email.endsWith('@savio-lambersart.com')) {
        alert("⚠️ Accès refusé : utilise ton mail @savio-lambersart.com");
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Compte créé avec succès !");
            window.location.href = 'index.html';
        })
        .catch(err => {
            console.error(err.code);
            alert("Erreur d'inscription : " + err.message);
        });
};

// --- FONCTION CONNEXION ---
export const loginEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch(err => {
            alert("Erreur : Identifiants incorrects ou compte inexistant.");
        });
};

// --- GESTION DE L'AFFICHAGE (INDEX) ---
const topBarAuth = document.getElementById('auth-logged-out'); 
const bottomBarAuth = document.getElementById('auth-logged-in'); 
const btnLogout = document.getElementById('btn-logout');

onAuthStateChanged(auth, (user) => {
    if (user && user.email.endsWith('@savio-lambersart.com')) {
        if (topBarAuth) topBarAuth.style.display = 'none';
        if (bottomBarAuth) bottomBarAuth.style.display = 'block';
    } else {
        if (topBarAuth) topBarAuth.style.display = 'block';
        if (bottomBarAuth) bottomBarAuth.style.display = 'none';
    }
});

if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        signOut(auth).then(() => window.location.href = 'index.html');
    });
}
