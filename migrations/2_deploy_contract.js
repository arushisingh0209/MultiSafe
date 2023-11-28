var MultiSig = artifacts.require("MultiSignature");

module.exports = async function(deployer) {
  await deployer.deploy(MultiSig, ["0xa1Dd0bBBAFdfac170A8a531eFdA683ba4B238684", "0xB938D2A6DE9873Cc5116eba8A5eb7547DC91cAe8"],2);
};
