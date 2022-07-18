import "firebase/app";
import { ethers } from "ethers";
import { useHistory } from "react-router";
import VideoStore from '../components/VideoStore';
import { connectAuthEmulator } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as MembershipContract from "../artifacts/contracts/facets/MembershipFacet.sol/MembershipFacet.json"

const isRegistered = async (userAddress, provider) => {
    console.log("Contract Interface", MembershipContract["abi"]);
    const _provider = new ethers.providers.JsonRpcProvider("https://volta-archive-rpc.energyweb.org");
    console.log("Provider inspection :: ", _provider);
    const membershipContract = new ethers.Contract("0xB85bFa461FB3c97dB2796Fc5d7a63c3643e3eE35", MembershipContract["abi"], _provider);
    
    const memberStatus = await membershipContract.checkMembership();

    console.log("IsMember status: ", memberStatus);

    return memberStatus["isMember"];
}

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
            if (isRegistered(window.ethereum.selectedAddress, window.ethereum)){
                setIsConnected(true);
                setWeb3Infos({
                    ...web3Infos,
                    chainId: window.ethereum.chainId,
                    connectedAccount: window.ethereum.selectedAddress
                });
            }
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

        window.ethereum.on('disconnect', (infos) => {
            setWeb3Infos({});
            setIsConnected(false);
            window.location.reload();
            console.log("ETHEREUM OBJ :: ", window.ethereum._state.accounts);
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