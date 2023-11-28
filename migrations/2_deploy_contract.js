var MultiSig = artifacts.require("MultiSignature");

export default async function(deployer) {
  await deployer.deploy(MultiSig, ["0x1F6d7E7d1f5435702Ec361756aC7DdE9218eA004", "0x9EF0Ef8Ff2Acb64710c303532D72D1cf222a76E2"],2);
};
