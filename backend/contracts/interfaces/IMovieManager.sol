// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface IMovieManager {
    error MovieNotFound(uint256 requestedMovieIdD);
    error InsufficientFunds(uint256 providedFunds, uint256 totalCost);
}
