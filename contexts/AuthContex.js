import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { provider, database } from "../firebase/firebaseConfig"
import { ref, set } from "firebase/database";
export const AuthContext = createContext(null)

const auth = getAuth();

const AuthContextProvider = ({ children }) => {
    //const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null)
    const addUser = (item) => {
        set(ref(database, "users"), {"user": item})
    }

    const loginWithGoogle = () => {
        signInWithPopup(auth, provider).then((res) => addUser(res.user.displayName)).catch((err) => console.log(err))  
    }

    return (
        <AuthContext.Provider value={{ loginWithGoogle }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider