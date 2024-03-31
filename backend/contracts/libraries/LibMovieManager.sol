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
        uint256 releaseDate;
        address provider;
        string uri;
    }

    struct MovieManagerStorage {
        uint256 nbMovies;
        mapping(uint256 => Movie) movies;
    }

    function recordMovie(
        address provider,
        bytes32 title,
        uint256 releaseDate,
        string memory uri
    ) internal returns (uint256 nextID) {
        MovieManagerStorage storage movieStore = moviemanagerStorage();

        nextID = movieStore.nbMovies + 1;

        movieStore.movies[nextID] = Movie({
            index: nextID,
            title: title,
            price: 0,
            provider: provider,
            uri: uri,
            releaseDate: releaseDate
        });

        movieStore.nbMovies = nextID;
    }

    function moviemanagerStorage()
        internal
        pure
        returns (MovieManagerStorage storage mvStore)
    {
        bytes32 position = MOVIE_MANAGER_STORAGE_POSITION;

        assembly {
            mvStore.slot := position
        }
    }

    function fetchMovie(
        uint256 movieID
    ) internal view returns (Movie memory movie) {
        MovieManagerStorage storage movieStore = moviemanagerStorage();

        movie = movieStore.movies[movieID];
        if (movie.provider == address(0)) {
            revert IMovieManager.MovieNotFound(movieID);
        }
    }
}
