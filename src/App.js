import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import VALUES from "./VALUES";
import { showAuthScreen, showHomeScreen } from "./functions";
import DelayedCode from "./components/DelayedCode";
import './App.css';

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyAGC1aa2tRPnnEZ4xNZtRqO9oW1W39deVc",
    authDomain: "mirai-db-56095.firebaseapp.com",
    projectId: "mirai-db-56095",
    storageBucket: "mirai-db-56095.appspot.com",
    messagingSenderId: "196504183231",
    appId: "1:196504183231:web:521ae8bed135a27537c10a",
    measurementId: "G-Q06TMR8F0E"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();
  VALUES.db = db;
  VALUES.auth = auth;

  onAuthStateChanged(auth, async (user) => {
      if (user) {
        //user is signed in
        VALUES.user = user;
        // get user info
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          VALUES.userData = docSnap.data();
          showHomeScreen();
        } else {
          showAuthScreen();
          return;
        }
      } else {
        // User is signed out
        showAuthScreen();
      }
  });
  
  return (
    <DelayedCode />
  );
}

export default App;
