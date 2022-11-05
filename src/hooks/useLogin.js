import "firebase/app";
import { ethers } from "ethers";
import VideoStore from "../components/VideoStore";
import { connectAuthEmulator } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

export const useLogin = () => {
	const initialWeb3State = {
		chainId: null,
		accounts: null,
		connectedAccount: null,
	};

	const [provider, setProvider] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const [web3Infos, setWeb3Infos] = useState(initialWeb3State);

	const metamaskConnect = async () => {
		console.log("Connection with metaMask");
		try {
			if (window.ethereum) {
				const accounts = await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				if (accounts) {
					setWeb3Infos({
						...web3Infos,
						accounts,
						isUnlocked: window.ethereum._state.isUnlocked,
					});
					setIsConnected(true);
					return accounts;
				}
			}
		} catch (err) {
			throw ("Metamask Error: ", err);
		}
	};

	const handleNetworkChange = () => {
		window.location.reload();
	};
	const handleConnection = () => {
		console.log("ETHEREUM OBJ_STATE-ACCOUNTS:: ", window.ethereum);
		setWeb3Infos({
			...web3Infos,
		});
	};

	const handleAccounts = async (accounts) => {
		if (accounts.length === 0) {
			setIsConnected(false);
			setWeb3Infos(initialWeb3State);
		}
		window.location.reload();
	};

	useEffect(() => {
		if (
			window.ethereum &&
			window.ethereum.selectedAddress &&
			isConnected === false
		) {
			setProvider(window.ethereum);
			setIsConnected(true);
			setWeb3Infos({
				...web3Infos,
				chainId: window.ethereum.chainId,
				connectedAccount: window.ethereum.selectedAddress,
			});
		}
	});

	useEffect(() => {
		if (window.ethereum) {
			const _provider = window.ethereum;
			_provider.on("connect", handleConnection);
			_provider.on("chainChanged", handleNetworkChange);
			_provider.on("accountsChanged", (accounts) => {
				handleAccounts(accounts);
			});
		}
	});
	//     // window.ethereum._handleUnlockStateChanged();
	//     //Connect EventListenner
	//     // window.ethereum.on('connect', (infos) => {
	//     //     setWeb3Infos({
	//     //         ...web3Infos,
	//     //     });
	//     //     console.log("ETHEREUM OBJ :: ", window.ethereum._state.accounts);
	//     // });

	//     // window.ethereum.on('chainChanged', (chainId) => {
	//     //     console.log('Chain changed ..')
	//     //     window.location.reload();
	//     // });

	//     window.ethereum.on('disconnect', (infos) => {
	//         setWeb3Infos({});
	//         setIsConnected(false);
	//         window.location.reload();
	//         console.log("ETHEREUM OBJ :: ", window.ethereum._state.accounts);
	//     });
	// };
	return [
		isConnected,
		setIsConnected,
		web3Infos,
		// isRegistered,
		setWeb3Infos,
		metamaskConnect,
	];
};
