// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@thirdweb-dev/contracts/base/ERC721Base.sol";

contract VCSBT is ERC721Base {
    error Soulbound();

    constructor(string memory _name, string memory _symbol, address _royaltyRecipient, uint128 _royaltyBps)
        ERC721Base(_name, _symbol, _royaltyRecipient, _royaltyBps)
    {}

    mapping (address from => mapping(address to => mapping(uint256 tokenId => uint64 blockHeight))) public disclosure;

    function issueDisclosure(address from, address to, uint256 tokenId, uint64 blockHeight) external {
        disclosure[from][to][tokenId] = blockHeight;
    }

    function getDisclosure(address from, address to, uint256 tokenId) external view returns (uint64 blockHeight) {
        blockHeight = disclosure[from][to][tokenId];
    }

    function isDisclosureValid(address from, address to, uint256 tokenId) external view returns (bool valid) {
        // TODO: block.timestamp も対応したい
        valid = block.number < disclosure[from][to][tokenId];
    }

    /// @dev Anyone can mint for testing purpose.
    function _canMint() internal view virtual override returns (bool) {
        return true;
    }

    /// @notice Overridden for soulbound
    function approve(address, uint256) public virtual override {
        revert Soulbound();
    }

    /// @notice Overridden for soulbound
    function setApprovalForAll(address, bool) public virtual override {
        revert Soulbound();
    }

    /// @notice Overridden for soulbound
    function transferFrom(address, address, uint256) public virtual override {
        revert Soulbound();
    }

    /// @notice Overridden for soulbound
    function safeTransferFrom(address, address, uint256, bytes memory) public virtual override {
        revert Soulbound();
    }
}
