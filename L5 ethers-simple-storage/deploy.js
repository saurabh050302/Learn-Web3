const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();
// console.log(process.env.PRIVATE_KEY, process.env.RPC_URL);

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); //we will use the encryptedKey.json to create wallet

    const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
    let wallet = new ethers.Wallet.fromEncryptedJsonSync(
        encryptedJson,
        process.env.PRIVATE_KEY_PASSWORD,
    );

    wallet = await wallet.connect(provider);
    const abi = fs.readFileSync(
        "./simpleStorage_sol_SimpleStorage.abi",
        "utf8",
    );
    const binary = fs.readFileSync(
        "./simpleStorage_sol_SimpleStorage.bin",
        "utf8",
    );

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying... please wait");
    const deployOptions = { gasLimit: 2000000 };
    const contract = await contractFactory.deploy(deployOptions);
    const transactionReceipt = await contract.deployTransaction.wait(1); //waits until 1 block confirmation
    console.log(`Contract Address -> ${contract.address}`);

    // console.log(contract.deployTransaction); //this is deployment transaction
    // console.log(transactionReceipt); // this is transaction receipt

    // lets deploy using the transaction data;

    // // tx -> is a unsigned transaction. it has similar data as in deployTransaction
    // const nonce = await wallet.getTransactionCount();
    // const tx = {
    //   nonce: nonce,
    //   gasPrice: 20000000000,
    //   gasLimit: 6721975,
    //   to: null,
    //   value: 0,
    //   data: "0x6080604052600460005534801561001557600080fd5b50610150806100256000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806367e0badb1461003b578063cd16ecbf14610059575b600080fd5b610043610075565b60405161005091906100d9565b60405180910390f35b610073600480360381019061006e919061009d565b61007e565b005b60008054905090565b8060008190555050565b60008135905061009781610103565b92915050565b6000602082840312156100b3576100b26100fe565b5b60006100c184828501610088565b91505092915050565b6100d3816100f4565b82525050565b60006020820190506100ee60008301846100ca565b92915050565b6000819050919050565b600080fd5b61010c816100f4565b811461011757600080fd5b5056fea2646970667358221220d63ee0173620ddce2836320df11da8c915b184d3dc7ad05a54dc7ece8f2afbff64736f6c63430008070033",
    //   chainId: 5777,
    // };
    // // console.log(tx);

    // // const signedTxReponse = await wallet.signTransaction(tx); //this just returns a signed txn but we need to send a the txn
    // const sentTxnResponse = await wallet.sendTransaction(tx);
    // await sentTxnResponse.wait(1);
    // console.log(signedTxReponse);

    //

    // Get Num
    const currentNum = await contract.getNum();
    console.log(`Current Number -> ${currentNum.toString()}`);

    // Set Num
    const txnResponse = await contract.setNum("5");
    const txnReceipt = await txnResponse.wait(1);
    const updatedCurrentNum = await contract.getNum();
    console.log(`Updated Current Number -> ${updatedCurrentNum.toString()}`);
}

main();
// .then(() => {
//   process.exit(0);
// })
// .catch(() => {
//   console.error("error");
//   process.exit(1);
// });
