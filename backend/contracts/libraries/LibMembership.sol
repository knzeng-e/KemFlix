//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library LibMembership {
    bytes32 constant MEMBERSHIP_STORAGE_POSITION =
        keccak256("maat.kemflix.membership.storage");

    struct MembershipStorage {
        mapping(address => bool) isMember;
        mapping(bytes32 => address) loginToAddress;
        mapping(address => bytes32) addressToLogin;
    }

    event MemberRegistered(
        bytes32 indexed login,
        address indexed user,
        uint256 indexed timestamp
    );

    event MemberRevoked(
        bytes32 indexed login,
        address indexed user,
        uint256 indexed timestamp
    );

    function membershipStorage()
        internal
        pure
        returns (MembershipStorage storage mbStore)
    {
        bytes32 position = MEMBERSHIP_STORAGE_POSITION;

        assembly {
            mbStore.slot := position
        }
    }
}
