var MultiSig = artifacts.require("MultiSignature");

module.exports = async function(deployer) {
  await deployer.deploy(MultiSig, ["0xb164767A45E8ef49073c30bd738Ad8807E01c477", "0x229Dcf15128038bF623227e84e9ec5B361f81c23"],2);
};
