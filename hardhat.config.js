require("@nomiclabs/hardhat-ethers");

module.exports = {
    solidity: "0.8.17",
    networks: {
        hardhat: {
            chainId: 1337
        },
        mumbai: {
            url: "https://polygon-mumbai.g.alchemy.com/v2/A0WsVMwzZrhZNtpslk8RDsbxZvHGvyfL",
            accounts: [`a32e9691d60bfbf4e3427e688fefdaaa5f65ed9b52c2a39012e076fc083ed950`]
        }
    },
}