/* global ethers */
/* eslint prefer-const: "off" */

const { FACET_NAMES, deployNewFacet } = require("./utils/facetsUtils");

const { getSelectors, FacetCutAction } = require("./libraries/diamond.js");

const { ERC20TokenInfos } = require("./libraries/ankhToken");

async function deployDiamond () {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[ 0 ];
  const { tokenName, tokenSymbol } = ERC20TokenInfos;

  // deploy DiamondCutFacet
  const DiamondCutFacet = await ethers.getContractFactory('DiamondCutFacet')
  const diamondCutFacet = await DiamondCutFacet.deploy()
  await diamondCutFacet.deployed()
  console.log('DiamondCutFacet deployed:', diamondCutFacet.address)

  // deploy Diamond
  const Diamond = await ethers.getContractFactory('Diamond')
  const diamond = await Diamond.deploy(contractOwner.address, diamondCutFacet.address)
  await diamond.deployed()
  console.log('Diamond deployed:', diamond.address)

  // deploy DiamondInit
  // DiamondInit provides a function that is called when the diamond is upgraded to initialize state variables
  // Read about how the diamondCut function works here: https://eips.ethereum.org/EIPS/eip-2535#addingreplacingremoving-functions
  const DiamondInit = await ethers.getContractFactory('DiamondInit')
  const diamondInit = await DiamondInit.deploy()
  await diamondInit.deployed()
  console.log('DiamondInit deployed:', diamondInit.address)

  /** Facets deployment */
  console.log('\nDeploying facets');

  const cut = []

  for (const facetName of FACET_NAMES) {
    const deployedFacet = await deployNewFacet(facetName);

    console.log(`${facetName} deployed: ${deployedFacet.address}`)
    const newFacetCut = {
      facetAddress: deployedFacet.address,
      action: FacetCutAction.Add,
      functionSelectors: getSelectors(deployedFacet)
    };

    cut.push(newFacetCut);
  }

  // upgrade diamond with facets
  console.log('\nDiamond Cut:', cut)
  const diamondCut = await ethers.getContractAt('IDiamondCut', diamond.address)
  let tx
  let receipt
  // call to init function
  let functionCall = diamondInit.interface.encodeFunctionData('init', [tokenName, tokenSymbol])
  tx = await diamondCut.diamondCut(cut, diamondInit.address, functionCall)
  console.log('Diamond cut tx: ', tx.hash)
  receipt = await tx.wait()
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`)
  }
  console.log('Completed diamond cut')
  return diamond.address
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  deployDiamond()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

exports.deployDiamond = deployDiamond
