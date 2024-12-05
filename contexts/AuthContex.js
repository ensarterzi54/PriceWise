import { getAuth, onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { provider, database } from "../firebase/firebaseConfig"
import { onValue, ref, set } from "firebase/database";
import { useRouter } from 'next/router';

export const AuthContext = createContext(null)
const auth = getAuth();
const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userVerified, setUserVerified] = useState(null)
    const [count, setCount] = useState(null)

    const router = useRouter();
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
              setUserVerified(user.emailVerified)
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

    const loginCount = async (uid, count) => {
        let val = 0
        const starCountRef = ref(database, `loginCount/${uid}`);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log("..: ", data?.count)
            val = data?.count + 1
        })
        
        set(ref(database, `loginCount/${uid}`), {
            count: val
        }).then(() => {
            setCount(val)
        })
    }

    const addSQL = async  (id, email, password) => {
        console.log("rrrr:", user)
        const postData = async () => {
            const data = {
                id,
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
           console.log("addSql: ", data)
        }).catch((error) => {
            console.log("addSql: ", error)
        });
    }
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((res) => {
            addUser(res.user.uid, res.user.displayName, res.user.email, res.user.emailVerified, res.providerId, res.user.photoURL, res.user.stsTokenManager.accessToken)
            setUser(res.user)
            addSQL(res.user.uid, email, password)
            router.push("/")
        }).catch((err) => console.log(err))
    }

    const signOutWithGoogle = () => {
        signOut(auth).then(() => {
            setUser(null)
            router.push("/login")
          })
    }

    const createUserEmailAndPassword = (email, password) => { //yeni kullanıcı kayıt olur
        console.log("çalıştıı:  ", email, password)
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                const user = res.user;
                addUser(res.user.uid, res.user.displayName, res.user.email, res.user.emailVerified, res.providerId, res.user.photoURL, res.user.stsTokenManager.accessToken)
                router.push("/")
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log("asd: ", res.user.uid, email, password)
                        addSQL(res.user.uid, email, password)
                    });
            }).catch((err) => {
                console.log(err)
            })
    }

    const signInEmailPassword = (email, password) => {
        signInWithEmailAndPassword(auth, email, password).then((res) => {
            console.log("res: ", res)
                router.push("/")
                loginCount(res.user.uid, 1)
            }
        )
    }

    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then((res) => {
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    return (
        <AuthContext.Provider value={{
            signInWithGoogle,
            signOutWithGoogle,
            createUserEmailAndPassword,
            signInEmailPassword,
            resetPassword,
            count,
            user,
            userVerified
        }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider