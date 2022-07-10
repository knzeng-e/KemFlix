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
            ds.addressToLogin[msg.sender] == bytes32(0),
            "already registered"
        );
        ds.isMember[msg.sender] = true;
        ds.addressToLogin[msg.sender] = _login;
    }

    function checkMembership() external view returns(bool isMember, bytes32 userName) {
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();

        isMember = ds.isMember[msg.sender];
        userName = ds.addressToLogin[msg.sender];
    }

    function revokeMembership() external onlyMember {
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        
        ds.isMember[msg.sender] = false;
    }


}