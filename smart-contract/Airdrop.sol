// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Airdrop {
    event Transfer(address indexed beneficiary, uint256 amount);

    function airdrop(
        address payable[] calldata beneficiaries,
        uint256[] calldata amounts
    ) external payable returns (bool) {
        require(
            beneficiaries.length == amounts.length,
            "Beneficiary and amount length mismatch"
        );

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }
        require(msg.value >= totalAmount, "Insufficient funds");

        for (uint256 i = 0; i < beneficiaries.length; i++) {
            _transfer(beneficiaries[i], amounts[i]);
        }
        return true;
    }

    function _transfer(address payable beneficiary, uint256 amount) internal {
        beneficiary.transfer(amount);
        emit Transfer(beneficiary, amount);
    }
}
