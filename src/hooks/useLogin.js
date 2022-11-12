import "firebase/app";
import { ethers } from "ethers";
import VideoStore from "../components/VideoStore";
import { connectAuthEmulator } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

import * as MembershipContract from "../artifacts/contracts/facets/MembershipFacet.sol/MembershipFacet.json";

const CONTRACT_ADDRESS = "0x39Af3E5FaeD7FE64905683226ab20E3a7Cea32d4";

export const useLogin = () => {
	const initialWeb3State = {
		chainId: null,
		accounts: null,
		connectedAccount: null,
	};

	const [provider, setProvider] = useState(null);
	const [username, setUsername] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const [web3Infos, setWeb3Infos] = useState(initialWeb3State);
	const [isUserRegistered, setIsUserRegistered] = useState(null);

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

	const ckeckRegistration = async () => {
		const _provider = new ethers.providers.Web3Provider(window.ethereum);
		const membershipContract = new ethers.Contract(
			CONTRACT_ADDRESS,
			MembershipContract["abi"],
			_provider.getSigner()
		);

		const memberStatus = await membershipContract.checkMembership();

		console.log("IsMember status: ", memberStatus);

		if (memberStatus["isMember"]) {
			const decodedUserName = ethers.utils.parseBytes32String(
				memberStatus["userName"]
			);
			console.log(
				`Decoded userName ${memberStatus["userName"]} :: ${decodedUserName}`
			);

			setIsUserRegistered(true);
			setUsername(decodedUserName);
		} else {
			setIsUserRegistered(false);
		}
	};

	useEffect(() => {
		if (isConnected) {
			ckeckRegistration();
		}
	}, [isConnected]);

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
	}, [isConnected, web3Infos]);

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

	return [
		username,
		web3Infos,
		isConnected,
		setWeb3Infos,
		setIsConnected,
		metamaskConnect,
		isUserRegistered,
	];
};
