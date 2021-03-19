const BlogNFT  = artifacts.require("BlogNFT");
const Marketplace = artifacts.require("Marketplace");

module.exports = function(deployer) {
  deployer.deploy(BlogNFT).then(async () => {
    const BlogNFTInstance = await BlogNFT.deployed();
    return deployer.deploy(Marketplace, BlogNFTInstance.address)
  });
};