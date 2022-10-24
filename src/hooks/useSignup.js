import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useLogin } from "./useLogin";
import * as MembershipContract from "../artifacts/contracts/facets/MembershipFacet.sol/MembershipFacet.json"


export const useSignup = () => {
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [ isConnected, web3Infos ] = useLogin();

  useEffect(() => {
    const ckeckRegistration = async (userAddress) => {
        const isReg = await isRegistered(userAddress, window.ethereum);
        if (isReg) {
          setIsUserRegistered(true);
        };
    }
    if (isConnected) {
        ckeckRegistration(web3Infos.connectedAccount);
    }
}, [isConnected, web3Infos.connectedAccount, web3Infos.provider]);

  const isRegistered = async (userAddress, provider) => {

    const _provider = new ethers.providers.Web3Provider(window.ethereum);
    const membershipContract = new ethers.Contract("0xB85bFa461FB3c97dB2796Fc5d7a63c3643e3eE35", MembershipContract[ "abi" ], _provider.getSigner());
    
    const memberStatus = await membershipContract.checkMembership();

    console.log("IsMember status: ", memberStatus);

    return memberStatus["isMember"];
}


    return [isUserRegistered];
}