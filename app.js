import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    updateProfile, onAuthStateChanged, signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Importations pour Firestore (Base de données)
import { 
    getFirestore, doc, getDoc, setDoc, updateDoc, increment 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuration extraite de ton image
const firebaseConfig = {
    apiKey: "AIzaSyB9CSBSLpB_DnXMbcFGm_h_cGGfYVYn2nA",
    authDomain: "club-rubik.firebaseapp.com",
    projectId: "club-rubik",
    storageBucket: "club-rubik.firebasestorage.app",
    messagingSenderId: "660354395142",
    appId: "1:660354395142:web:662c0646a37d24755ea787",
    
};

// Initialisation
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// --- UTILITAIRES ---
export function nettoyerTexte(str) {
    if (!str) return "";
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');
}

// --- LOGIQUE D'INSCRIPTION AVEC FIRESTORE ---
export const registerEmail = (email, password, name) => {
    if (!email.endsWith('@savio-lambersart.com')) {
        alert("Utilisez une adresse @savio-lambersart.com");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            
            // 1. Mise à jour du profil Auth
            await updateProfile(user, { displayName: name });
            
            // 2. Création du document dans Firestore (Données de jeu)
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                level: 1,
                xp: 0,
                lessonsCompleted: 0,
                badges: [],
                createdAt: new Date()
            });
        })
        .then(() => window.location.replace('/index.html'))
        .catch(err => alert("Erreur d'inscription : " + err.message));
};

// --- CONNEXION ---
export const loginEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => window.location.replace('/index.html'))
        .catch(err => alert("Identifiants incorrects ou utilisateur inconnu."));
};

// --- GESTION DE L'INTERFACE (Barre de navigation & Montserrat) ---
onAuthStateChanged(auth, (user) => {
    const topBarAuth = document.getElementById('auth-logged-out'); 
    const bottomBarAuth = document.getElementById('auth-logged-in'); 

    if (user && user.email.toLowerCase().endsWith('@savio-lambersart.com')) {
        if (topBarAuth) topBarAuth.style.display = 'none';
        
        if (bottomBarAuth) {
            bottomBarAuth.style.display = 'block';
            bottomBarAuth.innerHTML = `
                <span style="color:white; margin-right:15px; font-family:'Montserrat',sans-serif; font-weight:500;">
                    👤 ${user.displayName || 'Élève'}
                </span>
                <a href="#" id="btn-logout" class="btn-deconnexion" style="text-decoration:none; font-family:'Montserrat'; cursor:pointer; color:#ff4d4d;">
                    Déconnexion
                </a>
            `;
            document.getElementById('btn-logout').onclick = (e) => {
                e.preventDefault();
                signOut(auth).then(() => window.location.replace('/login.html'));
            };
        }
    } else {
        if (topBarAuth) topBarAuth.style.display = 'block';
        if (bottomBarAuth) bottomBarAuth.style.display = 'none';
    }
});

// Exportations pour les autres pages (Profile, Apprendre, etc.)
export { doc, getDoc, updateDoc, increment, onAuthStateChanged, signOut };
