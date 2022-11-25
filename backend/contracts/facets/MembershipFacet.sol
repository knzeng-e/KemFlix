// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import {IMembership} from "../interfaces/IMembership.sol";
import {LibMembership} from "../libraries/LibMembership.sol";

contract MembershipFacet is IMembership {
    modifier onlyMember() {
        LibMembership.MembershipStorage storage mbStore = LibMembership
            .membershipStorage();
        require(mbStore.isMember[msg.sender], "Not a member");
        _;
    }

    modifier onlyAdmin() {
        LibDiamond.enforceIsContractOwner();
        _;
    }

    function register(bytes32 login) external override {
        LibMembership.MembershipStorage storage mbStore = LibMembership
            .membershipStorage();

        require(
            mbStore.isMember[msg.sender] == false &&
                mbStore.addressToLogin[msg.sender] == bytes32(0),
            "already registered"
        );
        mbStore.isMember[msg.sender] = true;
        mbStore.addressToLogin[msg.sender] = login;
        emit LibMembership.MemberRegistered(login, msg.sender, block.timestamp);
    }

    function checkMembership()
        external
        view
        override
        returns (bool isMember, bytes32 userName)
    {
        LibMembership.MembershipStorage storage mbStore = LibMembership
            .membershipStorage();

        isMember = mbStore.isMember[msg.sender];
        userName = mbStore.addressToLogin[msg.sender];
    }

    function revokeMembership() external override onlyMember {
        LibMembership.MembershipStorage storage mbStore = LibMembership
            .membershipStorage();

        mbStore.isMember[msg.sender] = false;
        emit LibMembership.MemberRevoked(
            mbStore.addressToLogin[msg.sender],
            msg.sender,
            block.timestamp
        );
    }
}
