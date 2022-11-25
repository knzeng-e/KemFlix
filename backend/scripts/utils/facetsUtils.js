const facetNames = [
    'DiamondLoupeFacet',
    'OwnershipFacet',
    'MembershipFacet',
    'AnkhTokenFacet',
];

const getFacetArtifact = async (facetName) => {
    const facetArtifact = await ethers.getContractFactory(facetName);
    
    return facetArtifact;
};

const waitFacetMining = async (deployedFacet) => {
    await deployedFacet.deployed();
};

module.exports = {
    facetNames,
    waitFacetMining,
    getFacetArtifact,
};