require("@nomiclabs/hardhat-ethers");

module.exports = {
    solidity: "0.8.17",
    networks: {
        hardhat: {
            chainId: 1337
        },
        mumbai: {
            url: "https://polygon-mumbai.g.alchemy.com/v2/A0WsVMwzZrhZNtpslk8RDsbxZvHGvyfL",
            accounts: [`...`]
        }
    },
}
