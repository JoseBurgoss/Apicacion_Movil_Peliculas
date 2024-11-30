import { createContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from '../firebase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  const handleContainerPress = () => {
    Keyboard.dismiss();
  };

  const isEmail = (input) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(input).toLowerCase());
  };

  const onSignIn = async (input, password) => {
    try {
      let email = input;
      if (!isEmail(input)) {
        // Buscar el correo electrónico correspondiente al nombre de usuario en Firestore
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", input));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          throw new Error("Usuario no encontrado");
        }

        const userDoc = querySnapshot.docs[0];
        email = userDoc.data().email;
      }

      // Autenticar al usuario con Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setUserId(userCredential.user.uid);
    } catch (err) {
      console.error('Sign in failed:', err);
      throw err;
    }
  };

  const onRegister = async (username, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      setUser(userCredential.user);
      setUserId(userCredential.user.uid);

      // Inyectar datos del usuario en la base de datos de Firebase
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        username: username,
        email: email,
      });

      // Autenticar al usuario automáticamente después del registro
      await onSignIn(email, password);
    } catch (err) {
      console.error('Registration failed:', err);
      throw err;
    }
  };

  const logOut = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{
      handleContainerPress, email, setEmail, password, setPassword, user, setUser, registerEmail, setRegisterEmail, registerPassword, setRegisterPassword, confirmPassword,
      setConfirmPassword, resetEmail, setResetEmail, onSignIn, onRegister, logOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;