import "firebase/app";
import { useHistory } from "react-router";
import VideoStore from '../components/VideoStore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { connectAuthEmulator } from "firebase/auth";

export const useLogin = () => {

    const [isConnected, setIsConnected] = useState(false);
    const [web3Infos, setWeb3Infos] = useState({
        chainId: null,
        accounts: null,
        connectedAccount: null,
    });

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
            throw ("Metamask Error: ", err);
        }
    }

    useEffect(() => {
        console.log('Ethereum object ::: ', window.ethereum);
        if (window.ethereum && window.ethereum.selectedAddress && isConnected === false) {
            setIsConnected(true);
            setWeb3Infos({
                ...web3Infos,
                chainId: window.ethereum.chainId,
                connectedAccount: window.ethereum.selectedAddress
            });
        };
    });

    if (window.ethereum) {
        //Connect EventListenner
        window.ethereum.on('connect', (infos) => {
            setWeb3Infos({
                ...web3Infos,
            });
            console.log("ETHEREUM OBJ :: ", window.ethereum._state.accounts);
        });

        window.ethereum.on('chainChanged', (chainId) => {
            console.log('Chain changed ..')
            window.location.reload();
        });
    };
    return [
        isConnected,
        setIsConnected,
        web3Infos,
        setWeb3Infos,
        metamaskConnect,
    ];
}