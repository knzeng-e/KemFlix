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
}, [isConnected, web3Infos.connectedAccount]);

  const isRegistered = async (userAddress, provider) => {
    console.log("Contract Interface", MembershipContract["abi"]);
    const _provider = new ethers.providers.JsonRpcProvider("https://volta-archive-rpc.energyweb.org");
    console.log("Provider inspection :: ", _provider);
    const membershipContract = new ethers.Contract("0xB85bFa461FB3c97dB2796Fc5d7a63c3643e3eE35", MembershipContract["abi"], _provider);
    
    const memberStatus = await membershipContract.checkMembership();

    console.log("IsMember status: ", memberStatus);

    return memberStatus["isMember"];
}


    return [isUserRegistered];
}