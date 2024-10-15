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

    const addUser = (uid, name, email, emailVerified, providerId, photoURL, accessToken) => {
        set(ref(database, `users/${uid}`), {
            uid,
            name,
            email,
            emailVerified,
            providerId,
            photoURL,
            accessToken
          });
    }

    const addSQL = async  (email, password) => {
        const postData = async () => {
            const data = {
                email,
                password,
            };
    
            const response = await fetch("http://localhost:8080/api/users/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",  // JSON formatını belirtiyoruz
                },
                body: JSON.stringify(data),  // Veriyi JSON formatına çeviriyoruz
            });
    
            if (!response.ok) {
                // Eğer hata durumu varsa fırlat
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred");
            }
    
            return response.json();
        };
    
        postData().then((data) => {
            // alert(data.message);
        }).catch((error) => {
            // alert(error.message);  // Hata mesajını kullanıcıya göster
        });
    }
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((res) => {
            addUser(res.user.uid, res.user.displayName, res.user.email, res.user.emailVerified, res.providerId, res.user.photoURL, res.user.stsTokenManager.accessToken)
            setUser(res.user)
        }).catch((err) => console.log(err))
    }

    const signOutWithGoogle = () => {
        signOut(auth).then(() => {
            setUser(null)
          })
    }

    const createUserEmailAndPassword = (email, password) => { //yeni kullanıcı kayıt olur
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                const user = res.user;
                addUser(res.user.uid, res.user.displayName, res.user.email, res.user.emailVerified, res.providerId, res.user.photoURL, res.user.stsTokenManager.accessToken)
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        addSQL(email, password)
                    });
            }).catch((err) => {
                console.log(err)
            })
    }

    const signInEmailPassword = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
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