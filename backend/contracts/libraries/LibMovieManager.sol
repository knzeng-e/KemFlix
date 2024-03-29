//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import {IMovieManager} from "../interfaces/IMovieManager.sol";

library LibMovieManager {
    bytes32 constant MOVIE_MANAGER_STORAGE_POSITION =
        keccak256("maat.kemflix.moviemanager.storage");

    struct Movie {
        bytes32 title;
        uint256 index;
        uint256 price;
        address provider;
        string uri;
    }

    struct MovieManagerStorage {
        uint256 lastCreatedIndex;
        mapping(bytes32 => Movie) movies;
    }

    function _recordMovie(
        address provider,
        bytes32 title,
        string memory uri
    ) internal returns (uint256 nextID) {
        MovieManagerStorage storage movieStore = _moviemanagerStorage();

        nextID = movieStore.lastCreatedIndex + 1;

        movieStore.movies[title] = Movie({
            title: title,
            index: nextID,
            price: 0,
            provider: provider,
            uri: uri
        });

        movieStore.lastCreatedIndex = nextID;
    }

    function _moviemanagerStorage()
        internal
        pure
        returns (MovieManagerStorage storage mvStore)
    {
        bytes32 position = MOVIE_MANAGER_STORAGE_POSITION;

        assembly {
            mvStore.slot := position
        }
    }

    function checkExistance(
        bytes32 movieTitle
    ) internal view returns (Movie memory movie) {
        MovieManagerStorage storage movieStore = _moviemanagerStorage();

        movie = movieStore.movies[movieTitle];
        if (movie.provider == address(0)) {
            revert IMovieManager.MovieNotFound(movie.index);
        }
    }
}
