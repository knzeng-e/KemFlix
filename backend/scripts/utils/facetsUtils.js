const FACET_NAMES = [
    'DiamondLoupeFacet',
    'OwnershipFacet',
    'MembershipFacet',
    'AnkhTokenFacet',
];

const getFacetArtifact = async (facetName) => {
    const facetArtifact = await ethers.getContractFactory(facetName);
    
    return facetArtifact;
};

const deployNewFacet = async (facetName) => {
    const facetArtifact = await getFacetArtifact(facetName);
    const deployedFacet = await facetArtifact.deploy();
    await deployedFacet.deployed();
    
    return deployedFacet;
};

module.exports = {
    FACET_NAMES,
    deployNewFacet,
};