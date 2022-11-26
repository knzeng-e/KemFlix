// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import {IMembership} from "../interfaces/IMembership.sol";
import {LibMembership} from "../libraries/LibMembership.sol";

contract MembershipFacet is IMembership {
    using LibMembership for address;

    modifier onlyMember() {
        require(msg.sender._isMember(), "Not a member");
        _;
    }

    modifier onlyAdmin() {
        LibDiamond.enforceIsContractOwner();
        _;
    }

    function register(bytes32 login) external override {
        address user = msg.sender;
        require(user._isNotRegistered(), "already registered");
        LibMembership._recordMember(login, user);
    }

    function checkMembership()
        external
        view
        override
        returns (bool isMember, bytes32 userName)
    {
        LibMembership.MembershipStorage storage mbStore = LibMembership
            ._membershipStorage();

        isMember = mbStore.isMember[msg.sender];
        userName = mbStore.addressToLogin[msg.sender];
    }

    function revokeMembership() external override onlyMember {
        msg.sender._unRegister();
    }
}
