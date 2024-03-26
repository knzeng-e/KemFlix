// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import {LibMovieManager} from "../libraries/LibMovieManager.sol";
import {SolidStateERC1155} from "@solidstate/contracts/token/ERC1155/SolidStateERC1155.sol";

contract MovieManagerFacet is SolidStateERC1155 {

  using LibMovieManager for address;

  function createMovie(bytes32 movieTitle) external returns(uint256) {
  // ensureIsContentProvider();
  // uint256 nextID = LibMovieManager.

    uint256 nextID = 1;
    _safeMint(msg.sender, nextID, 1, "");
    msg.sender._recordMovie(movieTitle, nextID);
    return nextID;
  }
}