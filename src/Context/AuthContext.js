import React,{useState,useEffect} from 'react'
import {auth} from '../firebase'
export const AuthContext = React.createContext();
export function AuthProvider({children}){
    const [user,setUser] = useState();
    const [loading,setLoading] = useState(true);
    function signUp(email,pw){
        return auth.createUserWithEmailAndPassword(email,pw);
    }
    function login(email,pw){
        return auth.signInWithEmailAndPassword(email,pw);
    }
    function logout(){
        return auth.signOut();
    }
    function resetEmail(email){
        return auth.sendPasswordResetEmail(email);
    }
    useEffect(()=>{
        let unsub = auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoading(false);
        })
        return ()=>{
            unsub();
        }
    },[])
    const store = {
        user,
        signUp,
        login,
        logout,
        resetEmail
    }
    return (
        <AuthContext.Provider value = {store}>
            {!loading && children}
        </AuthContext.Provider>
    )
}