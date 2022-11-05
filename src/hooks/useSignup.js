import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useLogin } from "./useLogin";
import * as MembershipContract from "../artifacts/contracts/facets/MembershipFacet.sol/MembershipFacet.json"

const CONTRACT_ADDRESS = "0x39Af3E5FaeD7FE64905683226ab20E3a7Cea32d4";

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
    const membershipContract = new ethers.Contract(CONTRACT_ADDRESS, MembershipContract[ "abi" ], _provider.getSigner());
    
    const memberStatus = await membershipContract.checkMembership();

    console.log("IsMember status: ", memberStatus);

    if (memberStatus[ "isMember" ]) {
      console.log(`Decoded userName ${memberStatus["userName"]} :: ${ethers.utils.parseBytes32String(memberStatus["userName"])}`)
    }

    return memberStatus["isMember"];
  }


    return [isUserRegistered];
}