import "firebase/app";
import {Button} from 'semantic-ui-react';
import { useHistory } from "react-router";
import VideoStore from './VideoStore';
import React, { createContext, useContext, useEffect, useState } from 'react';

const Login = () => {
    console.log("Trying to connect ...");

    const [toggleInit, setToggleInit] = useState(true)
    
    const [isConnected, setIsConnected] = useState(false);
    const [web3Infos, setWeb3Infos] = useState({
        chainId: null,
        accounts : null,
        isUnlocked: false,
        isConnected: false,
        isUserConnected: false,
    })
    
    const metamaskConnect = async () => {
        console.log('Connection with metaMask');
        try {
            if (window.ethereum){
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                if (accounts){
                    setWeb3Infos({
                        ...web3Infos,
                        accounts,
                        isUnlocked: window.ethereum._state.isUnlocked
                    });
                }
                return accounts;
            }
        } catch (err) {
           throw("Metamask Error: ", err);
        }
    }

    useEffect(() => {
        console.log('Ethereum object : ', window.ethereum);
    })

    useEffect(() => {
        if (window.ethereum){
          window.ethereum.on('disconnect', () => {
            console.log("Disconnection from metamask .. ");
            setWeb3Infos({
                ...web3Infos,
                accounts: null,
                chainId: window.ethereum.chainId,
                isUnlocked: window.ethereum._state.isUnlocked
            });
        });
        
        if (window.ethereum._state.isUnlocked && toggleInit){
            setIsConnected(true);
            setWeb3Infos({
                ...web3Infos,
                accounts: window.ethereum.selectedAddress
            })
            setToggleInit(false);
        }
      
        window.ethereum.on('chainChanged', (chainId) => {
            console.log('Chain changed ..')
            window.location.reload();
          });
      
          window.ethereum.on('connect', (infos) => {
            console.log("Metamask is now connected :: ", infos);
            setWeb3Infos({
                ...web3Infos,
                isConnected: true
            })
          });
        }
      }, [web3Infos, isConnected])

    if (isConnected === false){
        return (
            <div id = 'login-page'>
                <div id = 'login-card'>
                    <h2> Welcome to Kem'Flix !</h2>
                        <Button className = 'login-button' onClick = {metamaskConnect}>
                            Sign-In with Metamsk
                        </Button>
                    <br /> <br />
                </div>
            </div>
        )
    }
    console.log("ACCOUNTS", web3Infos)
    return (
        <div>
            {web3Infos.accounts}
            <VideoStore user = { web3Infos.accounts }/>            
        </div>
    );
    
}

export default Login;