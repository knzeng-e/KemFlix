// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface IMembership {
    function register(bytes32 login) external;

    function checkMembership()
        external
        view
        returns (bool isMember, bytes32 userName);

    function revokeMembership() external;
}
