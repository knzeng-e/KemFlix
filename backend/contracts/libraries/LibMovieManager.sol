//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library LibMovieManager {
  bytes32 constant MOVIE_MANAGER_STORAGE_POSITION = keccak256("maat.kemflix.moviemanager.storage");

  struct MovieManagerStorage {
    uint256 lastCreatedIndex;
    mapping(uint256 => bytes32) movies;
    mapping(uint256 => address) providerOf;
  }

  function _recordMovie(address provider, bytes32 title, uint256 index) internal {
    MovieManagerStorage storage movieStore = _moviemanagerStorage();

    movieStore.movies[index] = title;
    movieStore.providerOf[index] = provider; 
    movieStore.lastCreatedIndex++;
  }

  function _moviemanagerStorage() internal pure returns(MovieManagerStorage storage mvStore) {
    bytes32 position = MOVIE_MANAGER_STORAGE_POSITION;

    assembly {
      mvStore.slot := position
    }
  }
}