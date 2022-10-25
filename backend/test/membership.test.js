const {
    getSelectors,
    FacetCutAction,
    removeSelectors,
    findAddressPositionInFacets
  } = require('../scripts/libraries/diamond.js');

const { assert, expect, use } = require('chai');
const { deployDiamond } = require('../scripts/deploy.js');

const { deployMockContract } = require("@ethereum-waffle/mock-contract");
const { deployContract, loadFixture, MockProvider, solidity } = require("ethereum-waffle");
const { ethers } = require('hardhat');

use(solidity);

describe('MembershipFacet Tests', () => {
    let tx;
    let receipt;
    let userNameTest;
    let diamondAddress;

    const fixture = async (
        wallets
    ) => {
        diamondAddress = await deployDiamond();

        const signer1 = (await ethers.getSigners())[1]
        const signer2 = (await ethers.getSigners())[2]
        const signer3 = (await ethers.getSigners())[3]
        const signer4 = (await ethers.getSigners())[4]


        const asUser1 = (await ethers.getContractAt('MembershipFacet', diamondAddress, signer1));
        const asUser2 = (await ethers.getContractAt('MembershipFacet', diamondAddress, signer2));

        const asUser3 = await ethers.getContractAt('MembershipFacet', diamondAddress, signer3);
        const asUser4 = await ethers.getContractAt('MembershipFacet', diamondAddress, signer4);

        console.log("DIAMOND ADDRESS :: ", diamondAddress)
        return {
            user1: signer1,
            user2: signer2,
            user3: signer3,
            user4: signer4,
            asUser1,
            asUser2,
            asUser3,
            asUser4,
        };
    };
    
    it("Correctly sets userName : ", async () => {
        const { asUser1, asUser2 } = await loadFixture(fixture);
        userNameTest = ethers.utils.formatBytes32String("nzeng");

        tx = await asUser1.register(userNameTest);
        await tx.wait();
        
        const user1Status = await asUser1.checkMembership();
        const user2Status = await asUser2.checkMembership();
        
        expect(user1Status["isMember"]).to.be.true;
        expect(user2Status["isMember"]).to.be.false;
    });

    it("Prevent from double registeration", async () => {
        const { asUser1 } = await loadFixture(fixture);
        userNameTest = ethers.utils.formatBytes32String("nzeng");

        await expect(asUser1.register(userNameTest)).to.be.revertedWith("already registered");
    });
});