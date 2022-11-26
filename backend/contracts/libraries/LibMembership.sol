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

    function _recordMember(bytes32 login, address userAddress) internal {
        MembershipStorage storage mbStore = _membershipStorage();

        mbStore.isMember[userAddress] = true;
        mbStore.addressToLogin[userAddress] = login;
        emit MemberRegistered(login, userAddress, block.timestamp);
    }

    function _unRegister(address userAddress) internal {
        MembershipStorage storage mbStore = _membershipStorage();

        mbStore.isMember[userAddress] = false;
        emit MemberRevoked(
            mbStore.addressToLogin[userAddress],
            userAddress,
            block.timestamp
        );
    }

    function _isNotRegistered(address _operator) internal view returns (bool) {
        return (!_isMember(_operator) &&
            _membershipStorage().addressToLogin[_operator] == bytes32(0));
    }

    function _isMember(address _operator) internal view returns (bool) {
        return _membershipStorage().isMember[_operator];
    }

    function _membershipStorage()
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
