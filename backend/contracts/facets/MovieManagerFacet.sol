// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import {IMovieManager} from "../interfaces/IMovieManager.sol";
import {LibMovieManager} from "../libraries/LibMovieManager.sol";
import {SolidStateERC1155} from "@solidstate/contracts/token/ERC1155/SolidStateERC1155.sol";

contract MovieManagerFacet is SolidStateERC1155, IMovieManager {
    using LibMovieManager for bytes32;
    using LibMovieManager for address;

    function createMovie(
        bytes32 movieTitle,
        string memory uri
    ) external returns (uint256) {
        //TODO:  ensureIsContentProvider();

        uint256 nextID = msg.sender._recordMovie(movieTitle, uri);
        _safeMint(msg.sender, nextID, 1, "");
        _setTokenURI(nextID, uri);
        return nextID;
    }

    /**
     *  buyMovie - function called by any user seeking to own one instance of a movie
     * @param movieTitle - The title of the movie to buy
     */
    function buyMovie(bytes32 movieTitle) external payable {
        LibMovieManager.Movie memory movieToBuy = movieTitle.checkExistance();

        uint256 duePaiement = movieToBuy.price;

        if (msg.value < movieToBuy.price) {
            revert InsufficientFunds(msg.value, duePaiement);
        }
        // TODO: rufund remaining fund if more are provided
        // Alternativelty, the additional funds can converted into credit ankh tokens
        _safeMint(msg.sender, movieToBuy.index, 1, "");
    }

    /**
     *  buyMovie - function called by any user seeking to own several instances of a movie
     * @param movieTitle - The title of the movie to buy
     * @param amount - the amount of movies to buy
     */
    function buyMovie(bytes32 movieTitle, uint256 amount) external payable {
        LibMovieManager.Movie memory movieToBuy = movieTitle.checkExistance();

        uint256 totalCost = movieToBuy.price * amount;
        if (msg.value < (totalCost)) {
            revert InsufficientFunds(msg.value, totalCost);
        }
        // TODO: rufund remaining fund if more are provided
        // Alternativelty, the additional funds can converted into credit ankh tokens
        _safeMint(msg.sender, movieToBuy.index, amount, "");
    }

    // add ability to re-sell owned movies - issue #24
}
