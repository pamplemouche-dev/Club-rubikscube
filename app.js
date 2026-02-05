import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    updateProfile, onAuthStateChanged, signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
    getFirestore, doc, getDoc, setDoc, updateDoc, increment 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB9CSBSLpB_DnXMbcFGm_h_cGGfYVYn2nA",
    authDomain: "club-rubik.firebaseapp.com",
    projectId: "club-rubik",
    storageBucket: "club-rubik.firebasestorage.app",
    messagingSenderId: "660354395142",
    appId: "1:660354395142:web:662c0646a37d24755ea787",
    measurementId: "G-WQRTHDM9B8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Utilitaires
export function nettoyerTexte(str) {
    if (!str) return "";
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');
}

// Inscription
export const registerEmail = async (email, password, name) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            level: 1,
            xp: 0,
            lessonsCompleted: 0,
            badges: [],
            createdAt: new Date()
        });
        window.location.replace('/index.html');
    } catch (err) {
        alert("Erreur d'inscription : " + err.message);
    }
};

// Connexion
export const loginEmail = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.replace('/index.html');
    } catch (err) {
        alert("Identifiants incorrects");
    }
};

// Interface dynamique
onAuthStateChanged(auth, (user) => {
    const topBarAuth = document.getElementById('auth-logged-out'); 
    const bottomBarAuth = document.getElementById('auth-logged-in'); 

    if (user && user.email.toLowerCase().endsWith('@savio-lambersart.com')) {
        if (topBarAuth) topBarAuth.style.display = 'none';
        if (bottomBarAuth) {
            bottomBarAuth.style.display = 'block';
            bottomBarAuth.innerHTML = `
                <span style="color:white; margin-right:15px; font-family:'Montserrat',sans-serif;">
                    👤 ${user.displayName || 'Élève'}
                </span>
                <a href="#" id="btn-logout" style="color:#ff4d4d; text-decoration:none; font-weight:600;">Déconnexion</a>
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

// Exports pour les autres fichiers
export { auth, db, doc, getDoc, updateDoc, increment, onAuthStateChanged };
