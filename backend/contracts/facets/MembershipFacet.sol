// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { LibDiamond } from "../libraries/LibDiamond.sol";

contract MembershipFacet {
    modifier onlyMember() {
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        require(ds.isMember[msg.sender], "Not a member");
        _;
    }

    function register(bytes32 _login) external {
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        
        require(
            ds.isMember[msg.sender] == false && 
            ds.loginToAddress[_login] == address(0) &&
            ds.addressToLogin[msg.sender] == bytes32(0),
            "already registered"
        );
        ds.isMember[msg.sender] = true;
        ds.loginToAddress[_login] = msg.sender;
        ds.addressToLogin[msg.sender] = _login;
    }

    function checkMembership() external view returns(bool) {
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();

        return ds.isMember[msg.sender]; 
    }

    function revokeMembership() external onlyMember {
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        
        ds.isMember[msg.sender] = false;
    }


}