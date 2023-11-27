var MultiSig = artifacts.require("MultiSignature");

module.exports = async function(deployer) {
  await deployer.deploy(MultiSig, ["0x2A298fAB928c58373C85e1F14308579dAb74E6a9", "0xDF61728d231b4EFC49BF6B9f5864332fB566383d"],2);
};
