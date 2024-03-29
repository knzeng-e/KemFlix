// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { IERC173 } from "../interfaces/IERC173.sol";
import { LibDiamond } from "../libraries/LibDiamond.sol";

contract OwnershipFacet is IERC173 {
    function transferOwnership(address _newOwner) external override {
        LibDiamond.enforceIsContractOwner();
        LibDiamond.setContractOwner(_newOwner);
    }

    function owner() external override view returns (address owner_) {
        owner_ = LibDiamond.contractOwner();
    }
}