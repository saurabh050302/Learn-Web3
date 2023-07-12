# Lesson 5 - Ethers Simple Storage

-> make new folder  
-> install node.js  
-> install solc compiler  
-> optionally set solc compiler shortcut  
-> build .sol file  
-> compile -> .abi + .bin  
-> install ethers.js & fs-extra & dotenv  
-> build deploy.js -> make asycn main()  
                   -> provider -> ganache/testnet/mainnet  
                   -> wallet -> using encryptedJson  
                   -> connect wallet to provider  
                   -> read abi & bin  
                   -> build contractFactory -> using abi + bin + wallet  
                   -> build contract by deploying contractFactory -> use deploymentOptions  
-> build encrypt.js -> use wallet to encrypt key from .env file  
                    -> write into encryptedKey.json  
-> READY TO INTERACT WITH SMART CONTRACT!!  
