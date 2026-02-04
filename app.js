import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    updateProfile, onAuthStateChanged, signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9CSBSLpB_DnXmBcfGm_h_cGGFYVYn2nA",
  authDomain: "club-rubik.firebaseapp.com",
  projectId: "club-rubik",
  storageBucket: "club-rubik.firebasestorage.app",
  messagingSenderId: "660354395142",
  appId: "1:660354395142:web:662c0646a37d24755ea787",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Utilitaire de nettoyage pour la vérification Nom/Email
export function nettoyerTexte(str) {
    if (!str) return "";
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');
}

// Inscription
export const registerEmail = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return updateProfile(userCredential.user, { displayName: name });
        })
        .then(() => window.location.replace('/index.html'))
        .catch(err => alert("Erreur : " + err.message));
};

// Connexion
export const loginEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => window.location.replace('/index.html'))
        .catch(err => alert("Identifiants incorrects"));
};

// Gestion de l'affichage dynamique (Top Bar & Bottom Bar)
onAuthStateChanged(auth, (user) => {
    const topBarAuth = document.getElementById('auth-logged-out'); 
    const bottomBarAuth = document.getElementById('auth-logged-in'); 

    if (user && user.email.toLowerCase().endsWith('@savio-lambersart.com')) {
        if (topBarAuth) topBarAuth.style.display = 'none';
        if (bottomBarAuth) {
            bottomBarAuth.style.display = 'block';
            bottomBarAuth.innerHTML = `
                <span style="color:white; margin-right:15px; font-family: 'Montserrat', sans-serif; font-weight: 800;">
                    👤 ${user.displayName || 'Utilisateur'}
                </span>
                <a href="#" id="btn-logout" class="btn-deconnexion">
                    Déconnexion
                </a>
            `;
            document.getElementById('btn-logout').onclick = (e) => {
                e.preventDefault();
                signOut(auth);
            };
        }
    } else {
        if (topBarAuth) topBarAuth.style.display = 'block';
        if (bottomBarAuth) bottomBarAuth.style.display = 'none';
    }
});

export { onAuthStateChanged, signOut };
