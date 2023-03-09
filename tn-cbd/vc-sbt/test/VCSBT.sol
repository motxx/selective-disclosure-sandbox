// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/VCSBT.sol";

contract VCSBTTest is Test {
    function setUp() public {}

    function testIssueDisclosure() public {
        VCSBT vcsbt = new VCSBT("", "", address(0), 1);
        vcsbt.issueDisclosure(makeAddr("1"), makeAddr("2"), 1, 1000);
    }
}
