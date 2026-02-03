// 1. Importation des modules Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 2. Ta configuration Firebase (À compléter avec tes clés)
const firebaseConfig = {
    apiKey: "AIzaSyB9CSBSLpB_DnXmBcfGm_h_cGGFYVYn2nA",
  authDomain: "club-rubik.firebaseapp.com",
  projectId: "club-rubik",
  storageBucket: "club-rubik.firebasestorage.app",
  messagingSenderId: "660354395142",
  appId: "1:660354395142:web:662c0646a37d24755ea787",
};

// 3. Initialisation de Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Exportation des fonctions pour les utiliser dans login.html
export { signInWithPopup, signOut, onAuthStateChanged };

// 4. Sélection des éléments de l'interface
const topBarAuth = document.getElementById('auth-logged-out'); // Div "Commencer" en haut
const bottomBarAuth = document.getElementById('auth-logged-in'); // Div "Déconnexion" en bas
const btnLogout = document.getElementById('btn-logout');

// 5. Gestionnaire d'état de connexion (Le "cerveau" de l'affichage)
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Vérification du domaine de l'adresse mail
        if (user.email.endsWith('@savio-lambersart.com')) {
            console.log("Utilisateur valide connecté :", user.displayName);
            
            // On ajuste l'affichage
            if (topBarAuth) topBarAuth.style.display = 'none';    // Cache le bouton en haut
            if (bottomBarAuth) bottomBarAuth.style.display = 'block'; // Montre la déconnexion en bas
        } else {
            // Si le mail ne finit pas par le bon domaine, on déconnecte de force
            alert("Accès restreint. Veuillez utiliser votre compte @savio-lambersart.com");
            signOut(auth).then(() => {
                window.location.href = 'index.html';
            });
        }
    } else {
        // Personne n'est connecté
        console.log("Utilisateur non connecté.");
        if (topBarAuth) topBarAuth.style.display = 'block';   // Montre "Commencer" en haut
        if (bottomBarAuth) bottomBarAuth.style.display = 'none'; // Cache la déconnexion en bas
    }
});

// 6. Logique du bouton de déconnexion (Barre du bas)
if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            console.log("Déconnexion réussie");
            window.location.href = 'index.html'; // Redirection propre après déconnexion
        }).catch((error) => {
            console.error("Erreur lors de la déconnexion :", error);
        });
    });
}
