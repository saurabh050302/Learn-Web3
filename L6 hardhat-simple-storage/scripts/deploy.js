// imports
const { ethers, run, network } = require("hardhat"); //we import ethers from hardhat because it provides us extra functionality

// main

async function main() {
  // we don't need to define provider/wallet/rpc_url because hardhat is a testing tool it take cares in the backend

  const [deployer] = await ethers.getSigners();
  console.log(`Deployer Address -> ${deployer.address}`);
  console.log("Deploying...");
  const simpleStorage = await ethers.deployContract("SimpleStorage");
  console.log(`Contract Address -> ${await simpleStorage.getAddress()}`);

  // console.log(network.config.chainId);

  if (network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deploymentTransaction().wait(2);
    verify(await simpleStorage.getAddress(), []);
  }

  const currentValue = await simpleStorage.getNum();
  console.log(`Current Value is -> ${currentValue}`);

  const txnResponse = await simpleStorage.setNum(9);
  txnResponse.wait(2);
  const updatedValue = await simpleStorage.getNum();
  console.log(`Updated Value is -> ${updatedValue}`);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
}

main();
// .then(() => {
//   process.exit(0);
// })
// .catch(() => {
//   console.log(Error);
//   process.exit(0);
// });
