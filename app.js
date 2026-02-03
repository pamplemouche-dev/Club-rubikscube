import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    updateProfile, onAuthStateChanged, signOut 
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

// --- FONCTION DE NETTOYAGE (ACCENTS / MAJUSCULES / ESPACES) ---
export function nettoyerTexte(str) {
    return str
        .toLowerCase()
        .normalize("NFD")               // Sépare les accents des lettres
        .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
        .replace(/\s+/g, '');           // Supprime tous les espaces
}

// --- INSCRIPTION AVEC VÉRIFICATION ---
export const registerEmail = (email, password, name) => {
    if (!email.endsWith('@savio-lambersart.com')) {
        alert("Utilisez votre adresse @savio-lambersart.com");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // On enregistre le nom PROPRE (avec accents/majuscules) dans le profil
            return updateProfile(userCredential.user, { displayName: name });
        })
        .then(() => window.location.replace('index.html'))
        .catch(err => alert("Erreur : " + err.message));
};

// --- CONNEXION ---
export const loginEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => window.location.replace('index.html'))
        .catch(err => alert("Identifiants incorrects"));
};
