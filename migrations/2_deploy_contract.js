var MultiSig = artifacts.require("MultiSignature");

module.exports = async function(deployer) {
  await deployer.deploy(MultiSig, ["0x9a48dBac5089B772C0b42284d8992674a1ACc630", "0xea2b2A7facB52c01bfB2e832B99e1C5548a9878f", "0xD9e53737d98d0A8ec0381b915CB39Bc494fb81CF"],3);
};
