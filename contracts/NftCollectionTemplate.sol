//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract NftCollectionTemplate is ERC721URIStorage, AccessControl {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  constructor(string memory name, string memory symbol, address minter) ERC721(name, symbol) {
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(MINTER_ROLE, msg.sender);
    _setupRole(MINTER_ROLE, minter);
  }

  modifier canMint(){
    hasRole(MINTER_ROLE, msg.sender);
    _;
  }

  function mintNFT(address recipient, string memory tokenURI) public canMint returns (uint256) {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(recipient, newItemId);
    _setTokenURI(newItemId, tokenURI);

    return newItemId;
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
