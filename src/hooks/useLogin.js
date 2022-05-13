import "firebase/app";
import { useHistory } from "react-router";
import VideoStore from '../components/VideoStore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { connectAuthEmulator } from "firebase/auth";

export const useLogin = () => {
    console.log("Trying to connect ...");
    
    const [isConnected, setIsConnected] = useState(false);
    const [web3Infos, setWeb3Infos] = useState({
        chainId: null,
        accounts : null,
        connectedAccount: null,
    })
    if (window.ethereum) {

        //Connect EventListenner
       window.ethereum.on('connect', (infos) => {
           setWeb3Infos({
               ...web3Infos,
           });
        //    if (window.ethereum._state.accounts.length){
        //        setIsConnected(true);
        //    }
           console.log("ETHEREUM OBJ :: ", window.ethereum._state.accounts);
       });
 
   window.ethereum.on('chainChanged', (chainId) => {
       console.log('Chain changed ..')
       window.location.reload();
     });
   }
    
    const metamaskConnect = async () => {
        console.log('Connection with metaMask');
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                if (accounts) {
                    setWeb3Infos({
                        ...web3Infos,
                        accounts,
                        isUnlocked: window.ethereum._state.isUnlocked
                    });
                    setIsConnected(true)
                    return accounts;
                }
            }
        } catch (err) {
           throw("Metamask Error: ", err);
        }
    }

    useEffect(() => {
        console.log('Ethereum object ::: ', window.ethereum);
        if (window.ethereum.selectedAddress && isConnected === false) {
            setIsConnected(true);
            setWeb3Infos({
                ...web3Infos,
                chainId: window.ethereum.chainId,
                connectedAccount: window.ethereum.selectedAddress
            });
        };
    })

    return [
        isConnected,
        setIsConnected,
        web3Infos,
        setWeb3Infos,
        metamaskConnect
    ];

    // if (isConnected === false) {
    //     return (
    //         <Container className = 'login-page'>
    //             <Segment placeholder className = 'login-card'>
    //                 <h2> Welcome to Kem'Flix !</h2>
    //                     <Button animated className = 'login-button' onClick = {metamaskConnect}>
    //                         Sign-In with Metamsk
    //                     </Button>
    //                 <br /> <br />
    //             </Segment>
    //         </Container>
    //     );
    // }
    // console.log("ACCOUNTS", web3Infos)
    // return (
    //     <div>
    //         {web3Infos.connectedAccount}
    //         <VideoStore users = { web3Infos.accounts }/>            
    //     </div>
    // );
    
}