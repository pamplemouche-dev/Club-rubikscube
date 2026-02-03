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
  appId: "1:660354395142:web:662c0646a37d24755ea787",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// --- UTILITAIRES ---
export function nettoyerTexte(str) {
    if (!str) return "";
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');
}

// --- ACTIONS AUTH ---
export const registerEmail = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return updateProfile(userCredential.user, { displayName: name });
        })
        .then(() => window.location.replace('index.html'))
        .catch(err => alert("Erreur : " + err.message));
};

export const loginEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => window.location.replace('index.html'))
        .catch(err => alert("Identifiants incorrects"));
};

// Dans ton app.js, garde bien cette partie pour les boutons d'accueil :
onAuthStateChanged(auth, (user) => {
    const topBarAuth = document.getElementById('auth-logged-out'); 
    const bottomBarAuth = document.getElementById('auth-logged-in'); 

    if (user && user.email.endsWith('@savio-lambersart.com')) {
        // Gérer les boutons si on est sur index.html
        if (topBarAuth) topBarAuth.style.display = 'none';
        if (bottomBarAuth) {
            bottomBarAuth.style.display = 'block';
            bottomBarAuth.innerHTML = `
                <span style="color:white; margin-right:15px;">👤 ${user.displayName || 'Utilisateur'}</span>
                <a id="btn-logout" class="btn-deconnexion">Déconnexion</a>
            `;
            document.getElementById('btn-logout').onclick = () => signOut(auth);
        }
    } else {
        if (topBarAuth) topBarAuth.style.display = 'block';
        if (bottomBarAuth) bottomBarAuth.style.display = 'none';
    }
});
// À la fin de app.js
export { auth, onAuthStateChanged, registerEmail, loginEmail, nettoyerTexte };
