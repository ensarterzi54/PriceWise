import { getAuth, onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { provider, database } from "../firebase/firebaseConfig"
import { ref, set } from "firebase/database";

export const AuthContext = createContext(null)
const auth = getAuth();
console.log("auth: ", auth)
const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
            }
        });
    }, [])

    const addUser = (uid, name, email, emailVerified, providerId, photoURL) => {
        set(ref(database, `users/${uid}`), {
            uid,
            name,
            email,
            emailVerified,
            providerId,
            photoURL
          });
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((res) => {
            console.log("res: ", res)
            addUser(res.user.uid, res.user.displayName, res.user.email, res.user.emailVerified, res.providerId, res.user.photoURL)
            setUser(res.user)
        }).catch((err) => console.log(err))
    }

    const signOutWithGoogle = () => {
        signOut(auth).then(() => {
            console.log(auth)
            setUser(null)
            localStorage.removeItem("user")
          })
    }

    const createUserEmailAndPassword = (email, password) => { //yeni kullanıcı kayıt olur
        console.log("sdfsd")
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                const user = res.user;
                addUser(res.user.uid, res.user.displayName, res.user.email, res.user.emailVerified, res.providerId, res.user.photoURL)
                console.log("email ve password ile kayıt yapıldı: ", user)
                sendEmailVerification(auth.currentUser)
                    .then((data) => {
                        console.log("verification", data)
                    });
            })
    }

    const signInEmailPassword = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("email ve password ile giriş yapıldı: ", user)
            })
    }

    return (
        <AuthContext.Provider value={{
            signInWithGoogle,
            signOutWithGoogle,
            createUserEmailAndPassword,
            signInEmailPassword,
            user
        }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider