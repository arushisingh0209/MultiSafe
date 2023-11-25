var MultiSig = artifacts.require("MultiSignature");

module.exports = async function(deployer) {
  await deployer.deploy(MultiSig, ["0x2e7117531C9b925b380AfD93206d0754eB81e471", "0xdAfec3546Db50e1D52C1Cb1667e02eFD3701D8e1"],2);
};
