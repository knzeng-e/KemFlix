import "firebase/app";
import React from 'react';
import  { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithRedirect } from "firebase/auth";
//import { auth } from '../firebase-config';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';

const googleLogin = async () => {
    
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    
    const logIn = await signInWithRedirect(auth, provider);

    return logIn;
}
const Login = () => {
    console.log("Trying to connect ...")
    return (
        <div id = 'login-page'>
            <div id = 'login-card'>
                <h2> Welcome to Kem'Flix !</h2>
                <div 
                    className = 'login-button google'
                    onClick = {googleLogin}
                >
                    <GoogleOutlined /> Sign-In with Google
                </div>
                <br /> <br />
                <div
                    className = 'login-button facebook'
                    onClick = {() => signInWithRedirect(new FacebookAuthProvider())}
                >
                    <FacebookOutlined /> Sign-In with Meta
                </div>
            </div>
        </div>
    )
}

export default Login;